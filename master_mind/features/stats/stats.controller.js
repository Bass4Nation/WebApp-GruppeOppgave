import * as statsService from './stats.service'
import { getUserFromCookie } from '@/lib/utils/api'

export const createStats = async (req, res) => {
  const user = await getUserFromCookie(req)

  if (!user) {
    return res.status(401).json({ success: false, error: 'Unable to get user' })
  }

  const { game, currentRow, foundCombination } = req.body

  if (
    !game ||
    (!currentRow && currentRow !== 0) ||
    currentRow < 0 ||
    currentRow > 9 ||
    foundCombination === null
  ) {
    return res.status(400).json({
      success: false,
      error:
        'Required game stats are either missing or incorrect' /* Don't know if I should make error message less vague since someone can figure out exactly what they need to change in postman to pass the post request */,
    })
  }

  const createdStats = await statsService.create({
    game,
    user,
    currentRow,
    foundCombination,
  })

  if (!createdStats?.success) {
    return res.status(500).json({
      success: false,
      error: createdStats.error,
    })
  }

  return res.status(201).json({
    success: true,
    data: createdStats.data,
  })
}
