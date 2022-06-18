import * as slotsController from '@/features/slots/slots.controller'

export default async function handler(req, res) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'get':
      await slotsController.getAllSlots(req, res)
      break
    default:
      return res.status(405).end()
  }
}
