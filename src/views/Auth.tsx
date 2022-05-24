import { Spin } from "antd";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import landing from "../assets/landing.jpg";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
import { AuthContext } from "../contexts/AuthContext";

interface AuthProps {
  authRoute: string;
}

const Auth = (props: AuthProps) => {
  const { authRoute } = props;
  const navigate = useNavigate();

  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  // console.log("isAuthenticated", isAuthenticated);

  let body;

  if (authLoading) {
    return (body = (
      <Wrapper>
        <Spin />
      </Wrapper>
    ));
  } else if (isAuthenticated) {
    navigate("/dashboard");
  } else {
    return (body = (
      <Wrapper>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </Wrapper>
    ));
  }

  return <div>{body}</div>;
};

export default Auth;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${landing});
  background-size: cover;
  background-position: center;
`;
