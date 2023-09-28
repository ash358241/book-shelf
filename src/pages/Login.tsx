import { Form, Input, Button } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loggedInUser } from "../redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";

interface ICredential {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const onFinish = (values: ICredential) => {
    console.log("Received values:", values);
    const { email, password } = values;
    dispatch(loggedInUser({ email, password }));
  };

  if (user && !isLoading) {
    navigate("/");
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Login</h2>
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
              message: "Please enter a valid email!",
            },
            {
              required: true,
              message: "Please enter your email!",
            },
          ]}
        >
          <Input placeholder="Email" />
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
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
