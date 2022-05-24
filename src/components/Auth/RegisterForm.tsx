import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";

export interface RegisterFormValues {
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const { registerUser } = useContext(AuthContext);

  const [registerErr, setRegisterErr] = useState<string>();

  const onFinish = async (values: RegisterFormValues) => {
    console.log("values", values);
    if (values.password !== values.confirmPassword) {
      setRegisterErr("Password do not match");
      setTimeout(() => {
        setRegisterErr(undefined);
      }, 5000);
      return;
    }

    try {
      const registerData = await registerUser(values);
      // console.log("registerData", registerData);

      if (registerData.success === false) {
        setRegisterErr(registerData.message);
        setTimeout(() => {
          setRegisterErr(undefined);
        }, 5000);
      }
      // if (registerData.success) {
      //   navigate("/dashboard"); navigate in Auth.js, don't need here
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormWrapper>
      <h1>Register</h1>
      {registerErr && <p style={{ color: "red" }}>{registerErr}</p>}
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
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: "Please input your confirm password!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Confirm Password"
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
            Register
          </Button>
        </Form.Item>
        Or <Link to="/login">Login</Link>
      </Form>
    </FormWrapper>
  );
};

export default RegisterForm;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background: white;
  border-radius: 10px;
  text-align: center;
`;
