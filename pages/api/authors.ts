import type { NextApiRequest, NextApiResponse } from 'next'

import authors from '../../data/authors.json'
import { Author } from '../../interfaces/author'


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Author[]>
) {
    res.status(200).json(authors)
}
