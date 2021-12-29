import React, { useCallback, useEffect, useRef, useState } from "react";
import { Col, Row } from "antd";

import { Author } from "../interfaces/author";
import { Book } from "../interfaces/book";
import { useApp } from "../hooks/useApp";

import NationalityPicker from "./nationality-picker";
import Authors from "./authors";
import Books from "./books";

export const Tables: React.FC = () => {
  const { books, authors } = useApp();

  const [nationalityFilter, setNationalityFilter] = useState<string>("all");
  const [filteredAuthorsByNationality, setFilteredAuthorsByNationality] =
    useState<Author[]>([]);
  const [filteredBooksByNationality, setFilteredBooksByNationality] = useState<
    Book[]
  >([]);

  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [filteredAuthors, setFilteredAuthors] = useState<Author[]>([]);

  const [authorSearch, setAuthorSearch] = useState<string>("");
  const [booksSearch, setBooksSearch] = useState<string>("");

  let booksSearchInput = useRef<HTMLInputElement>();
  let authorsSearchInput = useRef<HTMLInputElement>();

  const handleCountClick = useCallback((authorName: string) => {
    setAuthorSearch("");
    setBooksSearch(authorName);
    setNationalityFilter("all");
    booksSearchInput.current!.value = authorName;
    authorsSearchInput.current!.value = "";
  }, []);

  useEffect(() => {
    setFilteredAuthors([...authors]);
    setFilteredAuthorsByNationality([...authors]);
    setFilteredBooksByNationality([...books]);
    setFilteredBooks([...books]);
  }, [books, authors]);

  useEffect(() => {
    let filteredAuthors: Author[] = [];
    let filteredBooks: Book[] = [];

    if (nationalityFilter === "all") {
      filteredAuthors = [...authors];
      filteredBooks = [...books];
    } else {
      filteredAuthors = authors.filter(
        (author) =>
          author.nationality.toLocaleLowerCase() ===
          nationalityFilter.toLocaleLowerCase()
      );
      filteredBooks = books.filter((book) =>
        filteredAuthors.some((author) => author.id === book.author_id)
      );
    }
    setFilteredBooksByNationality(filteredBooks);
    setFilteredBooks(filteredBooks);
    setFilteredAuthorsByNationality(filteredAuthors);
  }, [nationalityFilter, authors, books]);

  useEffect(() => {
    if (authorSearch.trim()) {
      const query = authorSearch.trim().toLocaleLowerCase();
      const filtered = filteredAuthorsByNationality.filter((author) => {
        const booksCount = books.filter(
          (book) => book.author_id === author.id
        ).length;
        return (
          author.id.toString().includes(query) ||
          booksCount.toString().includes(query) ||
          author.first_name.toLocaleLowerCase().includes(query) ||
          author.last_name.toLocaleLowerCase().includes(query) ||
          author.nationality.toLocaleLowerCase().includes(query)
        );
      });
      setFilteredAuthors(filtered);
    } else {
      setFilteredAuthors(filteredAuthorsByNationality);
    }
  }, [authorSearch, filteredAuthorsByNationality, books]);

  useEffect(() => {
    const query = booksSearch.trim().toLocaleLowerCase();
    const filtered = filteredBooksByNationality.filter((book) => {
      const author = authors.find((author) => author.id === book.author_id);
      const authorName = `${author?.first_name} ${author?.last_name}`;
      return (
        book.id.toString().toLocaleLowerCase().includes(query) ||
        book.title.toLocaleLowerCase().includes(query) ||
        book.year.toString().toLocaleLowerCase().includes(query) ||
        authorName.toLocaleLowerCase().includes(query)
      );
    });
    setFilteredBooks(filtered);
  }, [booksSearch, filteredBooksByNationality, authors]);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <NationalityPicker
          value={nationalityFilter}
          onSelect={setNationalityFilter}
        />
      </Col>

      <Col xs={24}>
        <Authors
          forwardedRef={authorsSearchInput}
          authors={filteredAuthors}
          onCountClicked={handleCountClick}
          onSearch={setAuthorSearch}
        />
      </Col>

      <Col xs={24}>
        <Books
          forwardedRef={booksSearchInput}
          books={filteredBooks}
          onSearch={setBooksSearch}
        />
      </Col>
    </Row>
  );
};
