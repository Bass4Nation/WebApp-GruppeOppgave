import prisma from '@/lib/clients/db'

export const findUnique = async (calenderId) => {
  try {
    const calender = await prisma.calender.findUnique({
      where: {
        id: Number(calenderId),
      },
    })

    return { success: true, data: calender }
  } catch (error) {
    return {
      success: false,
      error: 'Error occured when searching for Calender',
    }
  }
}

export const findMany = async () => {
  try {
    const calenders = await prisma.calender.findMany()

    return { success: true, data: calenders }
  } catch (error) {
    return {
      success: false,
      error: 'Error occured when searching for Calenders',
    }
  }
}

export const findManyWithName = async (name) => {
  try {
    const calender = await prisma.calender.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      include: {
        slot: true,
      },
    })

    return { success: true, data: calender }
  } catch (error) {
    return { success: false, error: 'Error finding Calender' }
  }
}
