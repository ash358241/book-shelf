import { Tooltip, message } from "antd";
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "../redux/features/books/bookAPI";
import { List, Button, Space } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface IUser {
  user: {
    email: string | null;
  };
}

interface IBook {
  _id: string;
  title: string;
  author: string;
  userEmail: string;
}

export default function ManageBook({ user }: IUser) {
  const { data } = useGetBooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();

  const handleDeleteBook = async (bookId: string) => {
    try {
      const result = await deleteBook(bookId).unwrap();
      if (result) {
        message.success(`${result.message}`);
      } else {
        message.error("An error occurred while deleting the book");
      }
    } catch (error) {
      message.error("An error occurred while deleting the book");
    }
  };

  const bookList: IBook[] = data || [];

  return (
    <div style={{ backgroundColor: "#f7f7f7", padding: "24px" }}>
      <h1>Manage Books</h1>
      <List
        itemLayout="horizontal"
        dataSource={bookList}
        renderItem={(book: IBook) => (
          <List.Item>
            <List.Item.Meta
              title={book.title}
              description={`Author: ${book.author}`}
            />
            <Space>
              <Tooltip
                title={
                  book.userEmail !== user?.email
                    ? "You can only update your own books"
                    : "Update Book"
                }
              >
                <Link to={`/editBook/${book._id}`}>
                  <Button
                    type="link"
                    disabled={book.userEmail !== user?.email}
                    icon={
                      <EditOutlined
                        style={{
                          fontSize: "18px",
                          color:
                            book.userEmail === user?.email ? "blue" : "gray",
                          pointerEvents:
                            book.userEmail === user?.email ? "none" : "auto",
                        }}
                      />
                    }
                  />
                </Link>
              </Tooltip>
            </Space>
            <Space>
              <Tooltip
                title={
                  book.userEmail !== user?.email
                    ? "You can only delete your own books"
                    : "Delete Book"
                }
              >
                <Button
                  type="link"
                  disabled={book.userEmail !== user?.email}
                  icon={
                    <DeleteOutlined
                      style={{
                        fontSize: "18px",
                        color: book.userEmail === user?.email ? "red" : "gray",
                        pointerEvents:
                          book.userEmail === user?.email ? "none" : "auto",
                      }}
                    />
                  }
                  onClick={() => handleDeleteBook(book._id)}
                />
              </Tooltip>
            </Space>
          </List.Item>
        )}
      />
    </div>
  );
}
