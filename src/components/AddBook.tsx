import { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Row,
  Col,
  Upload,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../styles/AddBook.css";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useAddBookMutation } from "../redux/features/books/bookAPI";

interface BookFormValues {
  title: string;
  author: string;
  genre: string;
  publicationDate: { toISOString: () => string | Blob };
  image: File | null;
}
interface IUser {
  user: {
    email: string | null;
  };
}

const AddBook = ({ user }: IUser) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [addBook, { isLoading }] = useAddBookMutation();

  const onFinish = async (values: BookFormValues) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("author", values.author);
      formData.append("genre", values.genre);
      formData.append("publicationDate", values.publicationDate.toISOString());

      if (fileList.length > 0) {
        formData.append("image", fileList[0].originFileObj as File);
      }

      if (user?.email) {
        formData.append("userEmail", user.email);
      }

      await addBook(formData);
      message.success("Book submitted successfully");
      form.resetFields();
      setFileList([]);
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <div className="add-book-container">
      <h2 className="add-book-title">Add New Book</h2>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          title: "",
          author: "",
          genre: "",
          publicationDate: null,
          image: null,
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please enter the book title",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Author"
              name="author"
              rules={[
                {
                  required: true,
                  message: "Please enter the author's name",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Genre"
              name="genre"
              rules={[
                {
                  required: true,
                  message: "Please enter the book's genre",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Publication Date"
              name="publicationDate"
              rules={[
                {
                  required: true,
                  message: "Please select a publication date",
                },
              ]}
            >
              <DatePicker style={{ width: "100%" }} size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please enter the book's image",
                },
              ]}
            >
              <Upload
                action="http://localhost:8000/addBook"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                beforeUpload={() => false}
              >
                {fileList.length < 5 && "+ Upload"}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            icon={<PlusOutlined />}
            loading={isLoading}
            className="add-book-button"
          >
            Add Book
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddBook;
