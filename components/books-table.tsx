import * as React from "react";
import { Col, Input, Row, Table } from "antd";
import { Book } from "../interfaces/book";
import { useApp } from "../hooks/useApp";

interface BooksProps {
  books: Book[];
  booksSearch: string;
  onSearch: (query: string) => void;
}

const { Search } = Input;

export const Books: React.FC<BooksProps> = React.memo(
  ({ books, booksSearch, onSearch }) => {
    const { authors } = useApp();

    const columns = [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Author",
        dataIndex: "author",
        render: (text: string, record: Book, index: number) => {
          const author = authors.find(
            (author) => author.id === record.author_id
          );
          return `${author?.first_name} ${author?.last_name}`;
        },
        key: "author",
      },
      {
        title: "Year",
        dataIndex: "year",
        key: "year",
      },
    ];

    console.log("Books Table rerendered");

    return (
      <>
        <Row>
          <Col span={12}>
            <h2>Books</h2>
          </Col>

          <Col span={12}>
            <Search
              value={booksSearch}
              placeholder="Search authors..."
              onChange={(e) => onSearch(e.target.value)}
              allowClear
            />
          </Col>
        </Row>
        <Table dataSource={books} columns={columns} rowKey={"id"} />
      </>
    );
  }
);
