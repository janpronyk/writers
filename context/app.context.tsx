import { createContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { Author } from "../interfaces/author";
import { Book } from "../interfaces/book";

export interface IAppContext {
  books: Book[];
  authors: Author[];
  authorsPending: boolean;
  booksPending: boolean;
  authorsErrorMessage: string | null;
  booksErrorMessage: string | null;
}

const innitialState = {
  books: [],
  authors: [],
  authorsPending: false,
  booksPending: false,
  authorsErrorMessage: null,
  booksErrorMessage: null,
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export const AppContext = createContext<IAppContext>(innitialState);

export const AppProvider: React.FC = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [booksErrorMessage, setBooksErrorMessage] = useState<string | null>(
    null
  );
  const [authorsErrorMessage, setAuthorsErrorMessage] = useState<string | null>(
    null
  );

  const {
    data: booksData,
    isPending: booksPending,
    error: booksError,
  } = useFetch(`${API_URL}/books`);

  const {
    data: authorsData,
    isPending: authorsPending,
    error: authorsError,
  } = useFetch(`${API_URL}/authors`);

  useEffect(() => {
    if (booksData.length) {
      setBooks(booksData);
    }
  }, [booksData]);

  useEffect(() => {
    if (authorsData.length) {
      setAuthors(authorsData);
    }
  }, [authorsData]);

  useEffect(() => {
    if (booksError) {
      setBooksErrorMessage("Sorry there where a problem getting books data");
    }
  }, [booksError]);

  useEffect(() => {
    if (authorsError) {
      setAuthorsErrorMessage(
        "Sorry there where a problem getting authors data"
      );
    }
  }, [authorsError]);

  return (
    <AppContext.Provider
      value={{
        books,
        authors,
        authorsPending,
        booksPending,
        authorsErrorMessage,
        booksErrorMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
