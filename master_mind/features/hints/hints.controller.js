import * as hintService from './hints.service'

export const getHints = async (req, res) => {
  const state = req.body

  if (!state) {
    return res.status(400).json({ success: false, error: 'Missing game state' })
  }

  const getHint = await hintService.get({
    state,
  })

  if (!getHint) {
    return res.status(500).json({
      success: false,
      error: '500: Hints not retrived successfully',
    })
  }

  return res.status(200).json({
    ...getHint,
  })
}
