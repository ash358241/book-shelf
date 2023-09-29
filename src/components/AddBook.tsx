import React, { useState } from "react";
import { Form, Input, Button, DatePicker, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../styles/AddBook.css";
const AddBook = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = (values: unknown) => {
    setIsSubmitting(true);
    // Simulate an API request to add the book
    setTimeout(() => {
      console.log("Book added:", values);
      setIsSubmitting(false);
      form.resetFields();
    }, 1000);
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
              <Input />
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
              <Input />
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
              <Input />
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
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button
            type="primary"
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
