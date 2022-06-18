import prisma from '@/lib/clients/db'

export const create = async ({
  combination,
  user,
  numberOfTries,
  foundCombination,
}) => {
  try {
    const createResult = await prisma.game.create({
      data: {
        combination: combination,
        user: user,
        numberOfTries: numberOfTries,
        foundCombination: foundCombination,
      },
    })

    return { success: true, data: createResult }
  } catch (error) {
    return {
      success: false,
      error: error.toString(),
      message: 'Failed to save game stats',
    }
  }
}
