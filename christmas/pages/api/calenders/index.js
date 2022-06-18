import * as calenderController from '@/features/calenders/calenders.controller'

export default async function handler(req, res) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'get':
      await calenderController.getAllCalenders(req, res)
      break
    default:
      res.status(405).end()
  }
}
