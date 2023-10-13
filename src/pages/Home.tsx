import { Card, Col, Image, Row, Skeleton, Space, Spin, Typography } from "antd";
import {
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";
import { useGetBooksQuery } from "../redux/features/books/bookAPI";
import AppFooter from "../layouts/Footer";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Banner from "../components/Banner";

const { Text, Title } = Typography;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SeeMoreLink = styled.p`
  color: #1890ff;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 0;
  transition: color 0.3s;

  &:hover {
    text-decoration: underline;
  }

  span {
    margin-left: 4px;
  }
`;

export default function Home() {
  const { data, isLoading } = useGetBooksQuery(undefined);

  if (!data || isLoading) {
    return (
      <LoaderContainer>
        <Spin size="large" />
      </LoaderContainer>
    );
  }

  const sortedData = [...data].sort((a, b) => {
    const dateA: Date = new Date(a.publicationDate);
    const dateB: Date = new Date(b.publicationDate);
    return dateB.getTime() - dateA.getTime();
  });
  const bookData = sortedData?.slice(0, 10);

  return (
    <div style={{ padding: "20px" }}>
      <Banner />
      <Title style={{ color: "#1890ff", textAlign: "center" }}>
        Latest Books
      </Title>
      <Row gutter={16}>
        {bookData?.map(
          (book) =>
            book.approved !== false && (
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
                  <Link to={`/book/${book._id}`}>
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
                                  {format(
                                    new Date(book.publicationDate),
                                    "dd MMM, yyyy"
                                  )}
                                </Text>
                              </Space>
                            </div>
                          </div>
                        }
                      />
                    </Skeleton>
                  </Link>
                </Card>
              </Col>
            )
        )}
      </Row>
      <Link
        to="/all-books"
        style={{ textAlign: "right", textDecoration: "none" }}
      >
        <SeeMoreLink>
          See more books <span style={{ marginLeft: "4px" }}>&rarr;</span>
        </SeeMoreLink>
      </Link>
      <br />
      <AppFooter />
    </div>
  );
}
