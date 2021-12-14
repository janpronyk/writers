import type { NextApiRequest, NextApiResponse } from 'next'

import books from '../../../../data/books.json'
import { Book } from '../../../../interfaces/book'

type Data = {
    count: number
}

type ErrorResponse = {
    message: string
}


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | ErrorResponse>
) {
    const { id } = req.query

    if(isNaN(+id)) 
        return res.status(400).json({ message: 'Invalid Author id'})

    const count = books.filter((book: Book) => book.author_id === +id).length
    
    res.status(200).json({ count })
}
