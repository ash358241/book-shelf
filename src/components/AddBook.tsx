import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Row, Col, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../styles/AddBook.css";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
const AddBook = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onFinish = (values: unknown) => {
    setIsSubmitting(true);
    // Simulate an API request to add the book
    setTimeout(() => {
      console.log("Book added:", values);
      setIsSubmitting(false);
      form.resetFields();
    }, 1000);
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
                  type: "object",
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
                  type: "object",
                  message: "Please enter the book's image",
                },
              ]}
            >
              <Upload
                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
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
            icon={<PlusOutlined />}
            loading={isSubmitting}
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
