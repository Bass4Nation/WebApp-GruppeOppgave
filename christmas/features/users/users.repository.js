import prisma from '@/lib/clients/db'

export const findMany = async () => {
  try {
    const users = await prisma.user.findMany()

    return { success: true, data: users }
  } catch (error) {
    return { success: false, error: 'Error occured when finding Users' }
  }
}

export const exist = async (user) => {
  try {
    const userData = await prisma.user.findUnique({
      where: {
        id: user.id,
        username: user.username,
      },
    })

    return { success: true, data: userData }
  } catch (error) {
    return { success: false, error: 'Error occured when searching for User' }
  }
}

export const findUnique = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    })

    return { success: true, data: user }
  } catch (error) {
    return { success: false, error: 'Error occured when searching for User' }
  }
}
