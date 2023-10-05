import { Tooltip, message } from "antd"; // Import Ant Design message component
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "../redux/features/books/bookAPI";
import { List, Button, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default function ManageBook() {
  const { data } = useGetBooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();

  const handleDeleteBook = async (bookId) => {
    try {
      const result = await deleteBook(bookId).unwrap();
      console.log("🚀 ManageBook-16-> result =>", result);

      if (result) {
        message.success(`${result.message}`);
      } else {
        message.error("An error occurred while deleting the book");
      }
    } catch (error) {
      message.error("An error occurred while deleting the book");
    }
  };

  const bookList = data || [];

  return (
    <div style={{ backgroundColor: "#f7f7f7", padding: "24px" }}>
      <h1>Manage Books</h1>
      <List
        itemLayout="horizontal"
        dataSource={bookList}
        renderItem={(book) => (
          <List.Item>
            <List.Item.Meta
              title={book.title}
              description={`Author: ${book.author}`}
            />
            <Space>
              <Tooltip title="Delete Book">
                <Button
                  type="link"
                  icon={
                    <DeleteOutlined
                      style={{ fontSize: "18px", color: "red" }}
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
