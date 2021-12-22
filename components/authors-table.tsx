import React, { ChangeEvent } from "react";
import { Col, Input, Row, Table } from "antd";

import { Author } from "../interfaces/author";

import { useApp } from "../hooks/useApp";

interface AuthorsProps {
  authors: Author[];
  search: string;
  onSearch: (query: string) => void;
  onCountClicked: (authorName: string) => void;
}

const { Search } = Input;

export const Authors: React.FC<AuthorsProps> = React.memo(
  ({ authors, search, onSearch, onCountClicked }) => {
    const { books, authorsPending, authorsError } = useApp();

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

    return (
      <>
        <Row>
          <Col span={12}>
            <h2>Authors</h2>
          </Col>

          <Col span={12}>
            <Search
              placeholder="Search authors..."
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onSearch(e.target.value)
              }
              allowClear
            />
          </Col>
        </Row>

        {authorsError && (
          <div className="error">
            Sorry there where an error while loading authors data.
          </div>
        )}

        <Table
          dataSource={authors}
          columns={columns}
          loading={authorsPending}
          rowKey={"id"}
        />
      </>
    );
  }
);
