import type { NextApiRequest, NextApiResponse } from 'next'

import authors from '../../../data/authors.json'
import books from '../../../data/books.json'
import { AuthorWithBooksCount } from '../../../interfaces/author'
import { Book } from '../../../interfaces/book'


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<AuthorWithBooksCount[]>
) {
    const authorsWithBooksCount = authors.map(author => {
        const booksCount = books.filter((book: Book) => book.author_id === author.id).length
        return {
            ...author,
            booksCount
        }
    })
    res.status(200).json(authorsWithBooksCount)
}
