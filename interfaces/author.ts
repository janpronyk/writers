export interface Author {
    id: number,
    first_name: string,
    last_name: string,
    nationality: string
}

export interface AuthorWithBooksCount extends Author {
    booksCount: number
}