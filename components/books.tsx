import * as React from "react";
import { Col, Row, Table } from "antd";

import { Book } from "../interfaces/book";

import { useApp } from "../hooks/useApp";
import { debounce } from "lodash";

interface BooksProps {
  books: Book[];
  forwardedRef: any;
  onSearch: (query: string) => void;
}

const Books: React.FC<BooksProps> = React.memo(
  ({ books, forwardedRef, onSearch }) => {
    const { authors, booksPending, booksError } = useApp();

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
            <h2>Books</h2>
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

        {booksError && (
          <div className="error">
            Sorry there where an error while loading books data.
          </div>
        )}

        <Table
          loading={booksPending}
          dataSource={books}
          columns={columns}
          rowKey={"id"}
        />
      </>
    );
  }
);


Books.displayName = "Books"

export default Books