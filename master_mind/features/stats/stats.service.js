import * as statsRepo from './stats.repository'

export const create = async ({ game, user, currentRow, foundCombination }) => {
  const servicedStats = {
    combination: game?.combination.toString(),
    user: user,
    numberOfTries: currentRow + 1,
    foundCombination: foundCombination,
  }

  const createResult = await statsRepo.create({ ...servicedStats })

  if (!createResult?.success) {
    return { success: false, error: createResult.error }
  }

  return { success: true, data: createResult.data }
}
