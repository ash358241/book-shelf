import { Form, Input, Button } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createUser } from "../redux/features/user/userSlice";
import { useNavigate } from "react-router-dom";

interface ICredential {
  email: string;
  password: string;
}

export default function SignUp() {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const onFinish = (values: ICredential) => {
    const { email, password } = values;
    dispatch(createUser({ email, password }));
  };

  if (user && !isLoading) {
    navigate("/login");
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Sign Up</h2>
      <Form
        name="signup"
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
            style={{ borderRadius: "5px" }}
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
          <Input.Password
            placeholder="Password"
            size="large"
            style={{ borderRadius: "5px" }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "100%", borderRadius: "5px" }}
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
