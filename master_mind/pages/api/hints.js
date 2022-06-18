import * as hintController from '@/features/hints/hints.controller'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  await hintController.getHints(req, res)
}
