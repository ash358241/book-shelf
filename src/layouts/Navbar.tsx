import React, { useEffect } from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  BookOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { setUser } from "../redux/features/user/userSlice";
import styled from "styled-components";

const { Header } = Layout;
const { SubMenu } = Menu;

const StyledHeader = styled(Header)`
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AppNavbar: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email));
      } else {
        console.log("Null user");
      }
    });
  }, [dispatch]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <StyledHeader>
      <h2 style={{ color: "#ffffff" }}>BookShelf</h2>
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
        <SubMenu key="4" icon={<UserOutlined />} title="Account">
          {user.email ? (
            <>
              <Menu.Item key="4-1" icon={<DashboardOutlined />}>
                <Link to="/dashboard">Dashboard</Link>
              </Menu.Item>
              <Menu.Item
                key="4-2"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
              >
                Logout
              </Menu.Item>
            </>
          ) : (
            <Menu.Item key="4-2" icon={<LoginOutlined />}>
              <Link to="/login">Login</Link>
            </Menu.Item>
          )}
        </SubMenu>
      </Menu>
    </StyledHeader>
  );
};

export default AppNavbar;
