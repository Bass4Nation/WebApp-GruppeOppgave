import prisma from '@/lib/clients/db'

export const exist = async (slotId) => {
  try {
    const slot = await prisma.slot.findUnique({
      where: {
        id: Number(slotId),
      },
    })

    return { success: true, data: slot }
  } catch (error) {
    return { success: false, error: 'Error occured when searching for Slot' }
  }
}

export const findMany = async () => {
  try {
    const slots = await prisma.slot.findMany()

    return { success: true, data: slots }
  } catch (error) {
    return { success: false, error: 'Error occured when searching for Slots' }
  }
}

export const findManyWithCalenderId = async (calenderId) => {
  try {
    const slots = await prisma.slot.findMany({
      where: {
        calender: {
          is: {
            id: Number(calenderId),
          },
        },
      },
    })

    return { success: true, data: slots }
  } catch (error) {
    return { success: false, error: 'Error when finding slots' }
  }
}
