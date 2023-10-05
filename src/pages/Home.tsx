import { Card, Col, Image, Row, Skeleton, Space, Typography } from "antd";
import {
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useGetBooksQuery } from "../redux/features/books/bookAPI";
import AppFooter from "../layouts/Footer";

const { Text, Title } = Typography;

export default function Home() {
  const { data, isLoading } = useGetBooksQuery(undefined);

  if (!data || isLoading) {
    return <Skeleton active avatar />;
  }

  const sortedData = [...data].sort((a, b) => {
    const dateA: Date = new Date(a.publicationDate);
    const dateB: Date = new Date(b.publicationDate);
    return dateB.getTime() - dateA.getTime();
  });
  const bookData = sortedData?.slice(0, 10);

  return (
    <div style={{ padding: "20px" }}>
      <Title style={{ color: "#1890ff", textAlign: "center" }}>
        Latest Books
      </Title>
      <Row gutter={16}>
        {bookData?.map((book) => (
          <Col span={6} key={book._id}>
            <Card
              style={{
                height: 400,
                margin: "16px",
              }}
              hoverable
              cover={
                isLoading ? (
                  <Skeleton.Image
                    active
                    style={{ width: "100%", height: "200px" }}
                  />
                ) : (
                  <Image
                    src={`/images/${book.image}`}
                    alt={book.title}
                    height={200}
                  />
                )
              }
            >
              <Skeleton loading={isLoading} avatar active>
                <Card.Meta
                  title={book.title}
                  description={
                    <div style={{ marginTop: "20px" }}>
                      <div style={{ marginBottom: "10px" }}>
                        <Space align="baseline">
                          <UserOutlined
                            style={{ fontSize: "18px", color: "blue" }}
                          />
                          <Text>
                            <strong>Author:</strong> {book.author}
                          </Text>
                        </Space>
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <Space align="baseline">
                          <BookOutlined
                            style={{ fontSize: "18px", color: "green" }}
                          />
                          <Text>
                            <strong>Genre:</strong> {book.genre}
                          </Text>
                        </Space>
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <Space align="baseline">
                          <CalendarOutlined
                            style={{ fontSize: "18px", color: "red" }}
                          />
                          <Text>
                            <strong>Publication Date:</strong>{" "}
                            {book.publicationDate}
                          </Text>
                        </Space>
                      </div>
                    </div>
                  }
                />
              </Skeleton>
            </Card>
          </Col>
        ))}
      </Row>
      <br />
      <AppFooter />
    </div>
  );
}
