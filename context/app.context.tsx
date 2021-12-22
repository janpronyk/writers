import { createContext, useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { Author } from "../interfaces/author";
import { Book } from "../interfaces/book";

export interface IAppContext {
  books: Book[];
  authors: Author[];
  authorsPending: boolean
  authorsError: string | null
  booksPending: boolean
  booksError: string | null
}

const innitialState = {
  books: [],
  authors: [],
  authorsPending: false,
  authorsError: null,
  booksPending: false,
  booksError: null
};

export const AppContext = createContext<IAppContext>(innitialState);

export const AppProvider: React.FC = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  const {
    data: booksData,
    isPending: booksPending,
    error: booksError,
  } = useFetch("/api/books");

  const {
    data: authorsData,
    isPending: authorsPending,
    error: authorsError,
  } = useFetch("/api/authors");

  useEffect(() => {
    setBooks(booksData);
    setAuthors(authorsData);
  }, [booksData, authorsData]);

  return (
    <AppContext.Provider
      value={{
        books,
        authors,
        authorsPending,
        authorsError,
        booksPending,
        booksError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
