import { createContext, Reducer, useEffect, useReducer, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { Author } from "../interfaces/author";
import { Book } from "../interfaces/book";

export interface IAppContext {
  books: Book[];
  authors: Author[];
}

const innitialState = {
  books: [],
  authors: [],
};

export const AppContext = createContext<IAppContext>(innitialState);

export const AppProvider: React.FC = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const { data: booksData } = useFetch("/api/books");
  const { data: authorsData } = useFetch("/api/authors");

  useEffect(() => {
    setBooks(booksData);
    setAuthors(authorsData);
  }, [booksData, authorsData]);

  return (
    <AppContext.Provider value={{ books, authors }}>
      {children}
    </AppContext.Provider>
  );
};
