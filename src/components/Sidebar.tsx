import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BookOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import AddBook from "./AddBook";
import ManageBook from "./ManageBook";
import Welcome from "./Welcome";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [
    {
      key: "1",
      icon: <BookOutlined />,
      label: "Add Book",
    },
    {
      key: "2",
      icon: <EditOutlined />,
      label: "Manage Book",
    },
  ];

  let contentComponent = null;
  const handleMenuClick = (key: string) => {
    setSelectedMenuItem(key);
  };

  switch (selectedMenuItem) {
    case "1":
      contentComponent = <AddBook />;
      break;
    case "2":
      contentComponent = <ManageBook />;
      break;
    default:
      contentComponent = <Welcome />;
      break;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedMenuItem]}
          onClick={({ key }) => handleMenuClick(key)}
        >
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Link to="/">
            <h2>BookShelf</h2>
          </Link>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {contentComponent}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
