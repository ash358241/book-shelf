import { Form, Input, Button } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createUser } from "../redux/features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const TransparentPasswordInput = styled(Input.Password)`
  &&& .ant-input {
    background-color: transparent;
  }
`;
interface ICredential {
  email: string;
  password: string;
}

export default function SignUp() {
  const backgroundImage =
    "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2952&q=80";
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const onFinish = (values: ICredential) => {
    const { email, password } = values;
    dispatch(createUser({ email, password }));
  };

  if (user.email && !isLoading) {
    navigate("/login");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: `url(${backgroundImage})`,
        backgroundSize: "cover",
        position: "relative",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#fff",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <h2>BookShelf</h2>
      </Link>
      <div
        style={{
          minWidth: "400px",
          padding: "20px",
          background: "rgba(255, 255, 255, 0.8)",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <h2>Create an account</h2>
        <Form
          name="sign-up-form"
          onFinish={onFinish}
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
                type: "email",
              },
            ]}
          >
            <Input
              placeholder="Email"
              size="large"
              style={{ background: "transparent" }}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
            ]}
          >
            <TransparentPasswordInput
              placeholder="Password"
              style={{ background: "transparent" }}
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              style={{
                width: "100%",
                borderRadius: "5px",
                background: "rgba(0, 0, 0, 0.1)",
                color: "#333333",
              }}
            >
              <strong>Sign Up</strong>
            </Button>
          </Form.Item>
        </Form>
        <p style={{ textAlign: "center" }}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
