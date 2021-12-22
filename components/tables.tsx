import React, { useCallback, useEffect, useState } from "react";
import { NationalityPicker } from "../components/nationality-picker";
import { Authors } from "./authors-table";
import { Books } from "./books-table";
import { Col, Row } from "antd";

import { Author } from "../interfaces/author";
import { Book } from "../interfaces/book";

import { useApp } from "../hooks/useApp";

const filterAuthors = (authors: Author[], books: Book[], query: string) => {
  query.trim().toLocaleLowerCase();
  return authors.filter((author) => {
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
};

const filterBooks = (books: Book[], authors: Author[], query: string) => {
  query.trim().toLocaleLowerCase();
  return books.filter((book) => {
    const author = authors.find((author) => author.id === book.author_id);
    const authorName = `${author?.first_name} ${author?.last_name}`;
    return (
      book.id.toString().toLocaleLowerCase().includes(query) ||
      book.title.toLocaleLowerCase().includes(query) ||
      book.year.toString().toLocaleLowerCase().includes(query) ||
      authorName.toLocaleLowerCase().includes(query)
    );
  });
};

export const Tables: React.FC = () => {
  const { books, authors } = useApp();

  const [nationalityFilter, setNationalityFilter] = useState("all");
  const [filteredAuthorsByNationality, setFilteredAuthorsByNationality] =
    useState<Author[]>([]);
  const [filteredBooksByNationality, setFilteredBooksByNationality] = useState<
    Book[]
  >([]);

  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [filteredAuthors, setFilteredAuthors] = useState<Author[]>([]);

  const [authorSearch, setAuthorSearch] = useState("");
  const [booksSearch, setBooksSearch] = useState("");

  const handleCountClick = useCallback((authorName: string) => {
    setAuthorSearch("");
    setNationalityFilter("all");
    setBooksSearch(authorName);
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
  }, [nationalityFilter]);

  useEffect(() => {
    if (authorSearch.trim()) {
      const filtered = filterAuthors(
        filteredAuthorsByNationality,
        books,
        authorSearch
      );
      setFilteredAuthors(filtered);
    } else {
      setFilteredAuthors(filteredAuthorsByNationality);
    }
  }, [authorSearch, filteredAuthorsByNationality]);

  useEffect(() => {
    const filtered = filterBooks(
      filteredBooksByNationality,
      authors,
      booksSearch
    );
    setFilteredBooks(filtered);
  }, [booksSearch]);

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
          search={authorSearch}
          authors={filteredAuthors}
          onCountClicked={handleCountClick}
          onSearch={setAuthorSearch}
        />
      </Col>

      <Col xs={24}>
        <Books
          booksSearch={booksSearch}
          books={filteredBooks}
          onSearch={setBooksSearch}
        />
      </Col>
    </Row>
  );
};
