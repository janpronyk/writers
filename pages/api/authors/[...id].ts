import type { NextApiRequest, NextApiResponse } from 'next'

import authors from '../../../data/authors.json'
import { Author } from '../../../interfaces/author'


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Author | { message: string }>
) {
    const { id } = req.query

    if(isNaN(+id))
        return res.status(400).json({ message: 'Invalid id'})

    const authorData = authors.find(author => author.id === +id)

    if(!authorData)
        return res.status(400).json({ message: 'Author with given id not found'})
    
    res.status(200).json(authorData)
}
