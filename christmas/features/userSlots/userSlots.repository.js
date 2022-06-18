import prisma from '@/lib/clients/db'

// Denne er ikke blitt brukt men lagde for sikkerhetsskyld
export const findUnique = async (id) => {
  try {
    const userSlot = await prisma.userSlot.findUnique({
      where: {
        id: id,
      },
    })
    return { success: false, data: userSlot }
  } catch (error) {
    return {
      success: false,
      error: 'Error occured when searching for UserSlot',
    }
  }
}

// Denne er ikke blitt brukt men lagde for sikkerhetsskyld
export const findUniqueCoupon = async (coupon) => {
  try {
    const userSlot = await prisma.userSlot.findUnique({
      where: {
        coupon: coupon,
      },
    })

    return { success: true, data: userSlot }
  } catch (error) {
    return {
      success: false,
      error: 'Error occured when checking if coupon was unique',
    }
  }
}

export const findManyOnUser = async (userId) => {
  try {
    const userSlots = await prisma.userSlot.findMany({
      where: {
        userId: userId,
      },
    })

    return { success: true, data: userSlots }
  } catch (error) {
    return { success: false, error: 'Failed when searching for UserSlots' }
  }
}

export const findManyOnSlot = async (slotId) => {
  try {
    const userSlots = await prisma.userSlot.findMany({
      where: {
        slotId: Number(slotId),
      },
    })

    return { success: true, data: userSlots }
  } catch (error) {
    return {
      success: false,
      error: 'Error occured when searching for UserSlots',
    }
  }
}

export const findManyOnSlotIncludeUser = async (slotId) => {
  try {
    const userSlots = await prisma.userSlot.findMany({
      where: {
        slotId: Number(slotId),
      },
      include: {
        user: true,
      },
    })

    return { success: true, data: userSlots }
  } catch (error) {
    return {
      success: false,
      error: 'Error occured when searching for UserSlots',
    }
  }
}

export const findManyOnUserAndSlot = async (slotId, userId) => {
  try {
    const userSlot = await prisma.userSlot.findMany({
      where: {
        slotId: Number(slotId),
        userId: Number(userId),
      },
    })

    return { success: true, data: userSlot }
  } catch (error) {
    return {
      success: false,
      error: 'Error occured when searching for UserSlot',
    }
  }
}

export const findManyForUserOnCalenderId = async (userId, calenderId) => {
  try {
    const userSlots = await prisma.userSlot.findMany({
      where: {
        userId: Number(userId),
        slot: {
          calenderId: Number(calenderId),
        },
      },
    })

    return { success: true, data: userSlots }
  } catch (error) {
    return {
      success: false,
      error: 'Error occured when searching for UserSlots',
    }
  }
}

export const create = async (coupon, slotId, userId) => {
  try {
    const userSlot = await prisma.userSlot.create({
      data: {
        coupon: coupon,
        slotId: Number(slotId),
        userId: Number(userId),
      },
    })

    return { success: true, data: userSlot }
  } catch (error) {
    return { success: false, error: 'Error occured when creating UserSlot' }
  }
}
