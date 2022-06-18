import * as usersService from './users.service'

export const getAllUsers = async (req, res) => {
  const users = await usersService.getAllUsers()

  if (!users.success) {
    switch (users?.type) {
      case 'User.NotExist':
        return res.status(404).json({ success: false, error: users.error })
      default:
        return res.status(500).json({ success: false, error: users.error })
    }
  }
  return res.status(200).json({ success: true, data: users.data })
}
