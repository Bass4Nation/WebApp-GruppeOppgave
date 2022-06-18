import * as commentRepo from './comments.repository'
import * as issueRepo from '@/features/issues/issues.repository'

export const getCommentsOnIssue = async (id) => {
  const comments = await commentRepo.findMany(id)

  if (!comments.success) {
    return { success: false, error: issue.error }
  }

  if (!comments?.data.length > 0) {
    return {
      success: true,
      data: [],
    }
  }

  return { success: true, data: comments.data }
}

export const create = async ({ comment, issueId }) => {
  const issue = await issueRepo.exist(issueId)

  if (!issue.success) return { success: false, error: issue.error }

  if (!issue?.data)
    return {
      success: false,
      type: 'Issue.NotExist',
      error: `Issue with id: ${issueId} does not exist`,
    }

  const createdComment = await commentRepo.create({
    comment,
    created_at: new Date(),
    issueId,
  })

  // feil ved lagring av comment via ORM
  if (!createdComment.success) {
    return { success: false, error: createdComment.error }
  }

  return { success: true, data: createdComment.data }
}
