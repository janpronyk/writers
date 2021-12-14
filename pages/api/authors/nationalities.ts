import type { NextApiRequest, NextApiResponse } from 'next'

import authors from '../../../data/authors.json'


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<string[]>
) {
    const nationalities = new Set(authors.map(author => author.nationality))

    res.status(200).json(Array.from(nationalities))
}
