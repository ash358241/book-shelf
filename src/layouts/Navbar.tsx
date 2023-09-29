import React from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  BookOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header } = Layout;

const AppNavbar: React.FC = () => {
  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<BookOutlined />}>
          <Link to="all-books">All Books</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ShoppingCartOutlined />}>
          <Link to="/checkout">Checkout</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<LoginOutlined />}>
          <Link to="/login">Login</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default AppNavbar;
