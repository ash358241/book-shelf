import { Form, Input, Button } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  loggedInUser,
  signInWithGoogle,
} from "../redux/features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FcGoogle } from "react-icons/fc";

const TransparentPasswordInput = styled(Input.Password)`
  &&& .ant-input {
    background-color: transparent;
  }
`;
interface ICredential {
  email: string;
  password: string;
}

export default function Login() {
  const backgroundImage =
    "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2952&q=80";
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const onFinish = (values: ICredential) => {
    console.log("Received values:", values);
    const { email, password } = values;
    dispatch(loggedInUser({ email, password }));
  };

  const signUpWithGoogleButtonStyle = {
    width: "100%",
    borderRadius: "5px",
    background: "rgba(0, 0, 0, 0.1)",
    color: "#333333",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle());
  };

  if (user.email && !isLoading) {
    navigate("/");
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
        <h2>Login to explore</h2>
        <Form
          name="login-form"
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please enter a valid email!",
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
              size="large"
              placeholder="Password"
              style={{ background: "transparent" }}
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
              <strong>Log in</strong>
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              onClick={handleGoogleSignIn}
              style={signUpWithGoogleButtonStyle}
            >
              <strong>Login with Google</strong>
              <FcGoogle style={{ fontSize: 24 }} />
            </Button>
          </Form.Item>
        </Form>
        <p style={{ textAlign: "center" }}>
          Don't have an account? <Link to="/sign-up">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
