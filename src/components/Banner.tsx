import { Button, Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
`;

const BannerImage = styled.img`
  width: 100vw;
  height: 450px;
  margin-top: 50px;
`;

const CustomButton = styled(Button)`
  border: 1px solid #1576fb;
  &:hover {
    transform: scale(1.05);
  }
`;

const Banner = () => {
  return (
    <BannerContainer>
      <div>
        <Title level={1} style={{ marginBottom: 16, color: "#333" }}>
          Explore Your Literary World with BookShelf
        </Title>
        <Text
          style={{
            fontSize: 18,
            color: "#555",
          }}
        >
          Your personal literary haven awaits. Discover, read, and love books
          like never before with BookShelf.
        </Text>
        <br />
        <br />
        <Link to="/all-books">
          <CustomButton size="large" icon={<RightOutlined />}>
            Let's Explore
          </CustomButton>
        </Link>
      </div>
      <div>
        <BannerImage
          src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2946&q=80"
          alt="BookShelf Banner"
        />
      </div>
    </BannerContainer>
  );
};

export default Banner;
