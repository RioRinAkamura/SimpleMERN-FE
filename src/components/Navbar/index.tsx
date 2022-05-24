import React, { useContext } from "react";
import { Menu } from "antd";
import {
  InfoCircleOutlined,
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);

  const handleLogout = () => logoutUser();
  return (
    <Menu mode="horizontal">
      <MenuWrapper>
        <h2 style={{ paddingLeft: 20 }}>Login + JWT</h2>
        <Items>
          <Link to="/dashboard">
            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
              Dashboard
            </Menu.Item>
          </Link>
          <Link to="/about">
            <Menu.Item key="about" icon={<InfoCircleOutlined />}>
              About
            </Menu.Item>
          </Link>
          <Menu.Item disabled key="welcome" icon={<UserOutlined />}>
            Welcome {username}
          </Menu.Item>
          <Menu.Item
            key="logout"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Menu.Item>
        </Items>
      </MenuWrapper>
    </Menu>
  );
};

export default Navbar;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Items = styled.div`
  display: flex;
  align-items: center;
`;
