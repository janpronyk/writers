import type { NextApiRequest, NextApiResponse } from 'next'

import books from '../../../data/books.json'
import { Book } from '../../../interfaces/book'


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Book[]>
) {
    res.status(200).json(books)
}
