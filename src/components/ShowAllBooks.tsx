import { Card, Image, Skeleton, Typography, Space, Tooltip } from "antd";
import {
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Text } = Typography;

export default function ShowAllBooks({ data, isLoading }) {
  const { _id, title, author, genre, image, publicationDate } = data;

  const renderTitle = () => {
    if (title.length > 30) {
      return (
        <Tooltip title={title}>
          <span>{title.slice(0, 30)}...</span>
        </Tooltip>
      );
    } else {
      return <span>{title}</span>;
    }
  };

  return (
    <Card
      style={{
        width: 300,
        height: 400,
        margin: "16px",
      }}
      hoverable
      cover={
        isLoading ? (
          <Skeleton.Image active style={{ width: "100%", height: "200px" }} />
        ) : (
          <Image src={`/images/${image}`} alt={title} height={200} />
        )
      }
    >
      <Link to={`/book/${_id}`}>
        <Skeleton loading={isLoading} avatar active>
          <Card.Meta
            title={renderTitle()}
            description={
              <div style={{ marginTop: "20px" }}>
                <div style={{ marginBottom: "10px" }}>
                  <Space align="baseline">
                    <UserOutlined style={{ fontSize: "18px", color: "blue" }} />
                    <Text>
                      <strong>Author:</strong> {author}
                    </Text>
                  </Space>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <Space align="baseline">
                    <BookOutlined
                      style={{ fontSize: "18px", color: "green" }}
                    />
                    <Text>
                      <strong>Genre:</strong> {genre}
                    </Text>
                  </Space>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <Space align="baseline">
                    <CalendarOutlined
                      style={{ fontSize: "18px", color: "red" }}
                    />
                    <Text>
                      <strong>Publication Date:</strong> {publicationDate}
                    </Text>
                  </Space>
                </div>
              </div>
            }
          />
        </Skeleton>
      </Link>
    </Card>
  );
}
