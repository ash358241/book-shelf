import { Row, Col, Spin } from "antd";
import ShowAllBooks from "../components/ShowAllBooks";
import { useGetBooksQuery } from "../redux/features/books/bookAPI";
import { Key } from "react";
import styled from "styled-components";

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

export default function AllBooks() {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);
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
  return (
    <Row gutter={16}>
      {data?.map((data: { id: Key | null | undefined }) => (
        <Col span={6} key={data.id}>
          <ShowAllBooks data={data} isLoading={isLoading} />
        </Col>
      ))}
    </Row>
  );
}
