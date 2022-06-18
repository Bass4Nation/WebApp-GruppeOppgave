import * as statsController from '@/features/stats/stats.controller'
import { getUserFromCookie } from '@/lib/utils/api'

export default async function handler(req, res) {
  if (req.method.toLowerCase() !== 'post') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  await statsController.createStats(req, res)
}
