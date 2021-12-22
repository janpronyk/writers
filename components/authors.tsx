import * as React from "react";
import { Col, Row, Table } from "antd";

import { Author } from "../interfaces/author";

import { useApp } from "../hooks/useApp";
import { debounce } from "lodash";

interface AuthorsProps {
  authors: Author[];
  forwardedRef: any;
  onSearch: (query: string) => void;
  onCountClicked: (authorName: string) => void;
}


export const Authors: React.FC<AuthorsProps> = React.memo(
  ({ authors, forwardedRef, onSearch, onCountClicked }) => {
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

    const debounceSearch = React.useCallback(
      debounce(function (e: React.ChangeEvent<HTMLInputElement>) {
        onSearch(e.target.value);
      }, 500),
      []
    );

    return (
      <>
        <Row>
          <Col span={12}>
            <h2>Authors</h2>
          </Col>

          <Col span={12}>
            <input
              style={{ width: "100%" }}
              ref={forwardedRef}
              placeholder="Search authors..."
              onChange={debounceSearch}
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
