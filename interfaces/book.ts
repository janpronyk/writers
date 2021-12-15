export interface Book {
    id: number,
    author_id: number,
    title: string,
    year: number
}


export interface BookWithAuthor extends Book {
    author: string
}