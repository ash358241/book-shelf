import { useParams } from "react-router-dom";
import {
  useGetBookByIdQuery,
  usePostCommentMutation,
} from "../redux/features/books/bookAPI";
import { Typography, Row, Col, Spin, Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useState } from "react";

const { Title, Text } = Typography;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const BookImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const CenteredContainer = styled.div`
  width: 90%;
  margin: 30px auto;
  margin-top: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const FeedBackContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;

export default function SpecificBook() {
  const [postComment] = usePostCommentMutation();
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, isError } = useGetBookByIdQuery(id);

  const [feedback, setFeedback] = useState<string>("");

  const handleCommentSubmit = async () => {
    try {
      const response = await postComment({
        bookId: id,
        commentData: { feedback: feedback },
      });

      if (response) {
        setFeedback("");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  if (isLoading) {
    return (
      <LoaderContainer>
        <Spin size="large" />
      </LoaderContainer>
    );
  }

  if (isError) {
    return <div>Error loading book data</div>;
  }

  const {
    author,
    title,
    genre,
    image,
    publicationDate,
    feedback: comment,
  } = book;

  return (
    <>
      <CenteredContainer>
        <Row gutter={24} align="middle" justify="space-between" wrap={true}>
          <Col xs={24} sm={12}>
            <BookImage src={`/images/${image}`} alt={title} />
          </Col>
          <Col xs={24} sm={12}>
            <Title level={4}>{title}</Title>
            <Text>Author: {author}</Text>
            <br />
            <Text>Genre: {genre}</Text>
            <br />
            <Text>Publication Date: {publicationDate}</Text>
          </Col>
        </Row>
      </CenteredContainer>
      <FeedBackContainer>
        <Title level={4}>User Feedback</Title>
        <Input
          placeholder="Leave your feedback here"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          suffix={
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleCommentSubmit}
            />
          }
        />
      </FeedBackContainer>
      <FeedbackDisplay feedbackList={comment} />
    </>
  );
}

const FeedbackContainer = styled.div`
  width: 90%;
  margin: 20px auto;
`;

const FeedbackMessage = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
`;

interface FeedbackDisplayProps {
  feedbackList: { feedback: string }[] | undefined;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedbackList }) => {
  return (
    <FeedbackContainer>
      {feedbackList?.map((feedback, index) => (
        <FeedbackMessage key={index}>{feedback.feedback}</FeedbackMessage>
      ))}
    </FeedbackContainer>
  );
};
