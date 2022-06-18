import * as userSlotsController from '@/features/userslots/userslots.controller'

export default async function handler(req, res) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'post':
      await userSlotsController.createUserSlot(req, res)
      break
    default:
      return res.status(405).end()
  }
}
