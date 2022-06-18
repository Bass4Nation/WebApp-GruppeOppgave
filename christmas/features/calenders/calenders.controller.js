import * as calendersService from './calenders.service'

export const getAllCalenders = async (req, res) => {
  const calenders = await calendersService.getAll()

  if (!calenders.success) {
    switch (calenders?.type) {
      case 'Calender.NotExist':
        return res.status(404).json({ success: false, error: calenders.error })
      default:
        return res.status(500).json({ success: false, error: calenders.error })
    }
  }

  return res.status(200).json({ success: true, data: calenders.data })
}

export const getCalenderWithName = async (req, res) => {
  const { name } = req.query

  const calender = await calendersService.getCalender(name)

  if (!calender.success) {
    switch (calender?.type) {
      case 'Calender.NotExist':
        return res.status(404).json({ success: false, error: calender.error })
      default:
        return res.status(500).json({ success: false, error: calender.error })
    }
  }

  return res.status(200).json({ success: true, data: calender.data })
}
