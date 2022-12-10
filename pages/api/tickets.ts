import type { NextApiRequest, NextApiResponse } from 'next'
import tickets from './Data/tickets.json'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(tickets)
}
