import prisma from '@/lib/clients/db'

export const create = async ({ comment, created_at, issueId }) => {
  try {
    const newComment = await prisma.comment.create({
      data: {
        comment,
        created_at,
        issueId,
      },
    })

    return { success: true, data: newComment }
  } catch (error) {
    return { success: false, error: 'Failed to create comment' }
  }
}

export const findMany = async (identifier) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        issueId: identifier,
      },
    })

    return { success: true, data: comments }
  } catch (error) {
    return { success: false, error: 'Failed finding comments' }
  }
}

export const exist = async ({ comment }) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        comment,
      },
    })

    return { success: true, data: comment }
  } catch (error) {
    return { success: false, error: 'Failed finding comment' }
  }
}
