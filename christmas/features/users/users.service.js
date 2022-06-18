import * as usersRepo from './users.repository.js'

export const exist = async (user) => {
  const userResult = await usersRepo.exist(user)

  if (!userResult.success) {
    return { success: false, error: user.error }
  }

  if (!userResult.data) {
    return {
      success: false,
      type: 'User.NotExist',
      error: `User with id: ${user.id} does not exist`,
    }
  }

  return { success: true, data: user.data }
}

export const checkIfUserExists = async (userId) => {
  const user = await usersRepo.findUnique(userId)

  if (!user.success) {
    return { success: false, error: user.error }
  }

  if (!user.data) {
    return {
      success: false,
      type: 'User.NotExist',
      error: `User with id: ${userId} does not exist`,
    }
  }

  return { success: true, data: user.data }
}

export const getAllUsers = async () => {
  const users = await usersRepo.findMany()

  if (!users.success) {
    return { success: false, error: users.error }
  }

  if (!users.data.length > 0) {
    return {
      success: false,
      type: 'User.NotExist',
      error: 'Could not find any users!',
    }
  }
  return { success: true, data: users.data }
}
