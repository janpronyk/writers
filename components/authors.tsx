import * as React from "react";
import { Col, Row, Table } from "antd";
import { debounce } from "lodash";

import { Author } from "../interfaces/author";
import { useApp } from "../hooks/useApp";

interface AuthorsProps {
  authors: Author[];
  forwardedRef: any;
  onSearch: (query: string) => void;
  onCountClicked: (authorName: string) => void;
}

const Authors: React.FC<AuthorsProps> = React.memo(
  ({ authors, forwardedRef, onSearch, onCountClicked }) => {
    const { books, authorsPending, authorsErrorMessage } = useApp();

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
          if(books) {
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
          }
          return 0
        },
        key: "booksCount",
      },
    ];

    const debounceSearch = React.useCallback(
      debounce((e: React.ChangeEvent<HTMLInputElement>) => {
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

        {authorsErrorMessage && (
          <div className="error">{authorsErrorMessage}</div>
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

Authors.displayName = "Authors";

export default Authors;
