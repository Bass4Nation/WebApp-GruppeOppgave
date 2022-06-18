import * as usersController from '@/features/users/users.controller'

export default async function handler(req, res) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'get':
      await usersController.getAllUsers(req, res)
      break
    default:
      res.status(405).end()
  }
}
