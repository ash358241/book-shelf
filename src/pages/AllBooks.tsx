import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Spin,
  Space,
  Input,
  Typography,
  Dropdown,
  Menu,
  Button,
  Pagination,
  Card,
  Skeleton,
  Image,
} from "antd";
import {
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import { useGetBooksQuery } from "../redux/features/books/bookAPI";
import { Key } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 24px;
  text-align: center;
`;

interface Book {
  _id: Key;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  image: string;
  approved: boolean;
  feedback: string[];
}

export default function AllBooks() {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pageSize = 12;

  const updateQueryParams = () => {
    const queryParams = new URLSearchParams(window.location.search);
    if (sortOrder !== "") {
      queryParams.set("sort", sortOrder);
      queryParams.set("page", currentPage.toString());
      window.history.pushState(
        null,
        "",
        `${window.location.pathname}?${queryParams.toString()}`
      );
    }
  };

  const handleSortOrderChange = (order: string) => {
    setSortOrder(order);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    updateQueryParams();
  }, [sortOrder, currentPage]);

  useEffect(() => {
    const storedSortOrder = localStorage.getItem("sort");
    if (storedSortOrder) {
      setSortOrder(storedSortOrder);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sort", sortOrder);
  }, [sortOrder]);

  if (isLoading) {
    return (
      <LoaderContainer>
        <Spin size="large" />
      </LoaderContainer>
    );
  }

  if (isError) {
    return <ErrorMessage>Error loading books!</ErrorMessage>;
  }

  const filteredData = Object.values<Book>(data).filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = [...filteredData];
  if (sortOrder === "ascending") {
    sortedData.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOrder === "descending") {
    sortedData.sort((a, b) => b.title.localeCompare(a.title));
  }

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const booksToDisplay = sortedData.slice(startIndex, endIndex);

  const totalBooks = sortedData.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row
        justify="space-between"
        align="middle"
        style={{ width: "98%", margin: "0 auto" }}
      >
        <Col>
          <Title style={{ color: "#1890ff" }}>All Books</Title>
        </Col>
        <Col>
          <Input.Search
            size="large"
            placeholder="Search by title"
            onChange={(e: { target: { value: string } }) =>
              handleSearch(e.target.value)
            }
            style={{ width: 250, marginRight: "10px" }}
          />
          <Space direction="horizontal" size="middle" />
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="asc"
                  onClick={() => handleSortOrderChange("ascending")}
                >
                  Ascending <em>Title Wise</em>
                </Menu.Item>
                <Menu.Item
                  key="desc"
                  onClick={() => handleSortOrderChange("descending")}
                >
                  Descending <em>Title Wise</em>
                </Menu.Item>
              </Menu>
            }
          >
            <Button onClick={(e) => e.preventDefault()} size="large">
              Sort <DownOutlined />
            </Button>
          </Dropdown>
        </Col>
      </Row>
      <Row gutter={16}>
        {booksToDisplay?.map(
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
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalBooks}
        onChange={handlePageChange}
        style={{ textAlign: "right", margin: "16px" }}
      />
    </div>
  );
}
