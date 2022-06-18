import * as userSlotsService from './userSlots.service'
import * as slotService from '@/features/slots/slots.service'
import * as calenderService from '@/features/calenders/calenders.service'
import * as userService from '@/features/users/users.service'
import { userInfo } from '@/lib/utils/user'
import { validate } from '@/lib/validation'

export const getUserSlotsWithId = async (req, res) => {
  const { id } = req.query

  if (!Number(id)) {
    return res
      .status(400)
      .json({ success: false, error: `Query: ${id} is not a number` })
  }

  const userSlot = await userSlotsService.getById(id)

  if (!userSlot.success) {
    switch (userSlot?.type) {
      case 'UserSlot.NotExist':
        return res.status(404).json({ success: false, error: userSlot.error })
      default:
        return res.status(500).json({ success: false, error: userSlot.error })
    }
  }

  return res.status(200).json({ success: true, data: userSlot.data })
}

export const getSlotWinner = async (req, res) => {
  const { slotId } = req.query

  if (!Number(slotId)) {
    return res
      .status(400)
      .json({ success: false, error: `Query: ${slotId} is not a number` })
  }

  // Validate user

  const currentUser = await userInfo(req)

  const userId = currentUser?.user?.id

  if (!Number(userId)) {
    return res.status(400).json({
      success: false,
      error: 'User is undefined or not a number, user is required',
    })
  }

  const user = await userService.checkIfUserExists(userId)

  if (!user.success) {
    switch (user?.type) {
      case 'User.NotExist':
        return res.status(404).json({ success: false, error: user.error })
      default:
        return res.status(500).json({ success: false, error: user.error })
    }
  }

  if (!currentUser.admin) {
    return res.status(403).json({
      success: false,
      error: 'Only admins are authorized to choose a winner',
    })
  }

  const slot = await slotService.checkIfExist(slotId)

  if (!slot.success) {
    switch (slot?.type) {
      case 'Slot.NotExist':
        return res.status(404).json({ success: false, error: slot.error })
      default:
        return res.status(500).json({ success: false, error: slot.error })
    }
  }

  const winner = await userSlotsService.getSlotWinner(slotId)
}

export const getUserSlotsWithCurrentUser = async (req, res) => {
  const currentUser = await userInfo(req)

  if (!currentUser.user) {
    return res
      .status(401)
      .json({ success: false, error: 'User authentication failed' })
  }

  const user = await userService.checkIfUserExists(currentUser.user.id)

  if (!user.success) {
    switch (user?.type) {
      case 'User.NotExist':
        return res.status(404).json({ success: false, error: user.error })
      default:
        return res.status(500).json({ success: false, error: user.error })
    }
  }

  const userSlots = await userSlotsService.getAllForUser(currentUser.user.id)

  if (!userSlots.success) {
    return res.status(500).json({ success: false, error: userSlots.error })
  }

  return res.status(200).json({ success: true, data: userSlots.data })
}

export const getUserSlotsWithSlotId = async (req, res) => {
  const { slotId } = req.query

  if (!Number(slotId)) {
    return res
      .status(400)
      .json({ success: false, error: `Query: ${slotId} is not a number` })
  }

  const slot = await slotService.checkIfExist(slotId)

  if (!slot.success) {
    switch (slot?.type) {
      case 'Slot.NotExist':
        return res.status(404).json({ success: false, error: slot.error })
      default:
        return res.status(500).json({ success: false, error: slot.error })
    }
  }

  const userSlots = await userSlotsService.getAllForSlot(slotId)

  if (!userSlots.success) {
    return res.status(500).json({ success: false, error: userSlots.error })
  }

  return res.status(200).json({ success: true, data: userSlots.data })
}

export const getUserSlotsForUserWithCalenderId = async (req, res) => {
  const { calenderId } = req.query

  if (!calenderId || !Number(calenderId)) {
    return res
      .status(400)
      .json({ success: false, error: 'calenderId is invalid' })
  }

  const currentUser = await userInfo()

  if (!currentUser.user.id) {
    return res.status(401).json({
      success: false,
      error: 'User autentication failed, no user found',
    })
  }

  const user = await userService.checkIfUserExists(currentUser.user.id)

  if (!user.success) {
    switch (user?.type) {
      case 'User.NotExist':
        return res.status(404).json({ success: false, error: user.error })
      default:
        return res.status(500).json({ success: false, error: user.error })
    }
  }

  const calender = await calenderService.checkIfExist(calenderId)

  if (!calender.success) {
    switch (calender?.type) {
      case 'Calender.NotExist':
        return res.status(404).json({ success: false, error: calender.error })
      default:
        return res.status(500).json({ success: false, error: calender.error })
    }
  }

  const userSlots = await userSlotsService.getForUserOnCalenderId(
    currentUser.user.id,
    calenderId
  )

  if (!userSlots.success) {
    return res.status(500).json({ success: false, error: userSlots.error })
  }

  return res.status(200).json({ success: true, data: userSlots.data })
}

export const createUserSlot = async (req, res) => {
  const { slotId } = req.body

  const currentUser = await userInfo(req)

  if (!currentUser.user) {
    return res.status(401).json({
      success: false,
      error: 'Must be logged in as a user to open slot',
    })
  }

  // Validating data
  if (!slotId && !Number(slotId)) {
    return res.status(400).json({
      success: false,
      error: 'Missing required information, or wrong datatype',
    })
  }

  // Validating user
  const user = await userService.checkIfUserExists(currentUser.user.id)

  if (!user.success) {
    switch (user?.type) {
      case 'User.NotExist':
        return res.status(404).json({ success: false, error: user.error })
      default:
        return res.status(500).json({ success: false, error: user.error })
    }
  }

  const slot = await slotService.checkIfExist(slotId)

  if (!slot.success) {
    switch (slot?.type) {
      case 'Slot.NotExist':
        return res.status(404).json({ success: false, error: slot.error })
      default:
        return res.status(500).json({ success: false, error: slot.error })
    }
  }

  // Validating date
  const oneDay = 24 * 60 * 60 * 1000
  const date = Date.now()
  const openAt = Date.parse(slot.data.openAt)

  if (date <= openAt) {
    if (!validate.checkOpenDate(openAt)) {
      const daysLeft = Math.round(Math.abs((date - openAt) / oneDay))
      return res.status(403).json({
        success: false,
        error: `Opening of slot denied, the slot opens in ${daysLeft} day(s)`,
      })
    }
  }

  const userSlotExist = await userSlotsService.checkIfExist(
    slotId,
    currentUser.user.id
  )

  if (userSlotExist.success) {
    return res
      .status(403)
      .json({ success: false, error: 'Could not create, already exists' })
  }

  const userSlot = await userSlotsService.createUserSlot(
    slotId,
    currentUser.user.id
  )

  if (!userSlot.success) {
    switch (userSlot?.type) {
      case 'UserSlot.NotCreated':
        return res.status(500).json({
          success: false,
          error: 'UserSlot was not created',
        })
      default:
        return res.status(500).json({ success: false, error: userSlot.error })
    }
  }

  return res.status(201).json({ success: true, data: userSlot.data })
}
