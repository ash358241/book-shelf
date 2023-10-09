import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import dayjs from "dayjs";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "../redux/features/books/bookAPI";

export default function EditBook() {
  const { id } = useParams();
  const { data: book } = useGetBookByIdQuery(id);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [updateBook, { isLoading }] = useUpdateBookMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (book) {
      form.setFieldsValue({
        title: book.title,
        author: book.author,
        genre: book.genre,
        publicationDate: dayjs(book.publicationDate),
        image: book.image,
      });
    }
  }, [book, form]);

  const onFinish = async (values) => {
    try {
      await updateBook({ bookId: id, updatedBookData: values }).unwrap();
      message.success("Book successfully updated");
      navigate("/");
    } catch (error) {
      message.error("An error occurred while updating the book");
      console.log(error);
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
    <div className="add-book-container" style={{ margin: "30px" }}>
      <h2 className="add-book-title">Edit Book</h2>
      <Form form={form} onFinish={onFinish} layout="vertical">
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
              <Input size="large" placeholder="Enter book title" />
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
              <Input size="large" placeholder="Enter author's name" />
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
              <Input size="large" placeholder="Enter book genre" />
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
                  //   required: true,
                  message: "Please enter the book's image",
                },
              ]}
            >
              <Upload
                action={`http://localhost:8000/editBook/${id}`}
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
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
            loading={isLoading}
          >
            Save Edited Fields
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
