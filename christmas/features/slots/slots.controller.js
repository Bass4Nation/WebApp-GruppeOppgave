import * as slotsService from './slots.service'

export const getAllSlots = async (req, res) => {
  const slots = await slotsService.getAllSlots()

  if (!slots.success) {
    switch (slots?.type) {
      case 'Slot.NotExist':
        return res.status(404).json({ success: false, error: slots.error })
      default:
        return res.status(500).json({ success: false, error: slots.error })
    }
  }

  return res.status(200).json({ success: true, data: slots.data })
}

export const getSlotsWithCalenderId = async (req, res) => {
  const { calenderId } = req.query

  if (!Number(calenderId)) {
    return res.status(400).json({
      success: false,
      error: `${calenderId} er ikke et tall`,
    })
  }

  const slots = await slotsService.getSlots(calenderId)

  if (!slots.success) {
    switch (slots?.type) {
      case 'Slot.NotExist':
        return res.status(404).json({ success: false, error: slots.error })
      default:
        return res.status(500).json({ success: false, error: slots.error })
    }
  }

  return res.status(200).json({ success: true, data: slots.data })
}
