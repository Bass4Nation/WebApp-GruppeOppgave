import { generateCoupon } from '@/lib/utils/coupon'
import * as userSlotsRepo from './userslots.repository'

// Denne er ikke blitt brukt men lagde for sikkerhetsskyld
export const getById = async (id) => {
  const userSlot = await userSlotsRepo.findUnique(id)

  if (!userSlot.success) {
    return { success: false, error: userSlot.error }
  }

  if (!userSlot.data) {
    return {
      success: false,
      type: 'UserSlot.NotExist',
      error: `UserSlot with Id: ${id} does not exist`,
    }
  }

  return { success: true, data: userSlot.data }
}

export const checkIfExist = async (slotId, userId) => {
  const userSlot = await userSlotsRepo.findManyOnUserAndSlot(slotId, userId)

  if (!userSlot.success) {
    return { success: false, error: userSlot.error }
  }

  if (!userSlot.data.length > 0) {
    return {
      success: false,
      type: 'UserSlot.NotExist',
      error: `UserSlot with slotId: ${slotId} and userId: ${userId} does not exist`,
    }
  }

  return { success: true, data: userSlot.data }
}

export const getAllForUser = async (userId) => {
  const userSlots = await userSlotsRepo.findManyOnUser(userId)

  if (!userSlots.success) {
    return { success: false, error: userSlots.error }
  }

  return { success: true, data: userSlots.data }
}

export const getAllForSlot = async (slotId) => {
  const userSlots = await userSlotsRepo.findManyOnSlotIncludeUser(slotId)

  if (!userSlots.success) {
    return { success: false, error: userSlots.error }
  }

  return { success: true, data: userSlots.data }
}

export const getForUserOnCalenderId = async (userId, calenderId) => {
  const userSlots = await userSlotsRepo.findManyForUserOnCalenderId(
    userId,
    calenderId
  )

  if (!userSlots.success) {
    return { success: false, error: userSlots.error }
  }

  if (!userSlots.data) {
    return {
      success: false,
      type: 'UserSlot.NotCreated',
      error: userSlots.error,
    }
  }

  return { success: true, data: userSlots.data }
}

// Denne er ikke blitt brukt men lagde for sikkerhetsskyld
export const getSlotWinner = async (slotId) => {
  const userSlots = await userSlotsRepo.findManyOnSlot(slotId)

  if (!userSlots.success) {
    return { success: false, error: userSlots.error }
  }

  if (!userSlots.data.length > 0) {
    return {
      success: false,
      type: 'UserSlot.NotExist',
      error: `UserSlot does not exist on slotId: ${slotId}`,
    }
  }

  let winner
  if (userSlots.data.length === 1) {
    winner = userSlots.data[0]
  } else {
    winner = userSlots.data[Math.random() * userSlots.data.length]
  }

  return { success: true, data: winner }
}

export const createUserSlot = async (slotId, userId) => {
  let couponState = false
  let coupon = ''

  while (!couponState) {
    coupon = generateCoupon()
    let couponResult = await userSlotsRepo.findUniqueCoupon(coupon)

    // Sjekker om den returnerer data aka om den eksisterer
    if (couponResult.success && !couponResult.data) {
      couponState = true
    }
  }

  const userSlot = await userSlotsRepo.create(coupon, slotId, userId)

  if (!userSlot.success) {
    return { success: false, error: userSlot.error }
  }

  if (!userSlot.data) {
    return {
      success: false,
      type: 'UserSlot.NotCreated',
      error: userSlot.error,
    }
  }

  return { success: true, data: userSlot.data }
}
