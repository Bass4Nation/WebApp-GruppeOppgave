import * as calenderController from '@/features/calenders/calenders.controller'

export default async function handler(req, res) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'get':
      await calenderController.getCalenderWithName(req, res)
      break
    default:
      return res.status(405).end()
  }
}
