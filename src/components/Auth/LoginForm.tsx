import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";

export interface LoginFormValues {
  username: string;
  password: string;
}

const LoginForm = () => {
  // Context
  const { loginUser } = useContext(AuthContext);
  const [loginErr, setLoginErr] = useState<string>();

  const onFinish = async (values: LoginFormValues) => {
    try {
      const loginData = await loginUser(values);
      if (loginData.success === false) {
        setLoginErr(loginData.message);
        setTimeout(() => {
          setLoginErr(undefined);
        }, 5000);
      }
      // if (loginData.success) {
      //   navigate("/dashboard");  navigate in Auth.js, don't need here
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormWrapper>
      <h1>Login</h1>
      <p>username: rionguyen</p>
      <p>password: 123qweQWE</p>
      {loginErr && <p style={{ color: "red" }}>{loginErr}</p>}
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <p className="login-form-forgot">Forgot password</p>
          </div>
        </Form.Item>
        <Form.Item>
          <Button
            style={{ width: "100%" }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
        Or <Link to="/register">register now!</Link>
      </Form>
    </FormWrapper>
  );
};

export default LoginForm;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background: white;
  border-radius: 10px;
  text-align: center;
`;
