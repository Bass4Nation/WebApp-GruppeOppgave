import * as slotsRepo from './slots.repository'

export const checkIfExist = async (slotId) => {
  const slot = await slotsRepo.exist(slotId)

  if (!slot.success) {
    return { success: false, error: slot.error }
  }

  if (!slot.data) {
    return {
      success: false,
      type: 'Slot.NotExist',
      error: `Slot does not exist for slotId: ${slotId}`,
    }
  }

  return { success: true, data: slot.data }
}

export const getAllSlots = async () => {
  const slots = await slotsRepo.findMany()

  if (!slots.success) {
    return { success: false, error: slots.error }
  }

  if (!slots.data.length > 0) {
    return { success: false, type: 'Slot.NotExist', error: slots.error }
  }

  return { success: true, data: slots.data }
}

export const getSlots = async (calenderId) => {
  const slots = await slotsRepo.findManyWithCalenderId(calenderId)

  if (!slots.success) {
    return { success: false, error: slots.error }
  }

  if (!slots.data.length > 0) {
    return {
      success: false,
      type: 'Slot.NotExist',
      error: `Slots do not exist for calenderId: ${calenderId}`,
    }
  }

  return { success: true, data: slots.data }
}
