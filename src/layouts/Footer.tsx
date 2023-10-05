import { Layout, Row, Col } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer style={{ background: "#f0f2f5", textAlign: "center" }}>
      <Row justify="center">
        <Col xs={24}>
          <h2>BookShelf</h2>
          <p>Copyright © {new Date().getFullYear()} All rights reserved.</p>
          <div>
            <a
              href="https://www.facebook.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginRight: "10px" }}
            >
              <FacebookOutlined
                style={{ fontSize: "24px", color: "#1877f2" }}
              />
            </a>
            <a
              href="https://www.instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginRight: "10px" }}
            >
              <InstagramOutlined
                style={{ fontSize: "24px", color: "#e4405f" }}
              />
            </a>
            <a
              href="https://www.linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinOutlined
                style={{ fontSize: "24px", color: "#0077b5" }}
              />
            </a>
          </div>
        </Col>
      </Row>
    </Footer>
  );
};

export default AppFooter;
