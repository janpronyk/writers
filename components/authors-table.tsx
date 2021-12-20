import React, { useCallback } from "react";
import { Col, Input, Row, Table } from "antd";
import { Author } from "../interfaces/author";
import { debounce } from "lodash";
import { useApp } from "../hooks/useApp";

interface AuthorsProps {
  authors: Author[];
  authorsSearch: string;
  onSearch: (query: string) => void;
  onCountClicked: (authorName: string) => void;
}

const { Search } = Input;

export const Authors: React.FC<AuthorsProps> = React.memo(
  ({ authors, authorsSearch, onSearch, onCountClicked }) => {
    const { books } = useApp();

    const columns = [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Full Name",
        dataIndex: "full_name",
        render: (text: string, record: Author, index: number) =>
          `${record.first_name} ${record.last_name}`,
        key: "full_name",
      },
      {
        title: "Nationality",
        dataIndex: "nationality",
        key: "nationality",
      },
      {
        title: "Books Count",
        dataIndex: "booksCount",
        render: (text: string, record: Author, index: number) => {
          const count = books.filter(
            (book) => book.author_id === record.id
          ).length;
          return (
            <a
              onClick={() =>
                onCountClicked(`${record.first_name} ${record.last_name}`)
              }
            >
              {count}
            </a>
          );
        },
        key: "booksCount",
      },
    ];

    console.log("Authors Table rerendered");

    return (
      <>
        <Row>
          <Col span={12}>
            <h2>Authors</h2>
          </Col>

          <Col span={12}>
            <Search
              value={authorsSearch}
              placeholder="Search authors..."
              onChange={(e) => onSearch(e.target.value)}
              allowClear
            />
          </Col>
        </Row>
        <Table dataSource={authors} columns={columns} rowKey={"id"} />
      </>
    );
  }
);
