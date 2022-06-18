import { validate } from '@/lib/validation'
import * as commentsService from './comments.service'
import * as issueService from '@/features/issues/issues.service'

export const getCommentsOnIssue = async (req, res) => {
  const { id } = req.query

  const issue = await issueService.getByUrl(id)

  if (!issue) {
    switch (issue?.type) {
      case 'Issue.NotExist':
        return res.status(404).json({ success: false, error: issue.error })
      default:
        return res.status(500).json({ success: false, error: issue.error })
    }
  }

  const allComments = await commentsService.getCommentsOnIssue(id)

  if (!allComments.success) {
    switch (allComments?.type) {
      default:
        return res
          .status(500)
          .json({ success: false, error: allComments?.error })
    }
  }

  return res.status(200).json({ success: true, data: allComments.data })
}

export const createComment = async (req, res) => {
  const { comment, issueId } = req.body

  // 400 Bad Request hvis noen av feltene mangler
  if (!comment && !validate.maxLength(250, comment)) {
    return res
      .status(400)
      .json({ success: false, error: 'Missing required field: comment' })
  }

  if (!issueId) {
    return res
      .status(400)
      .json({ success: false, error: 'Missing required field: issueId' })
  }

  const createdComment = await commentsService.create({
    comment,
    issueId,
  })

  if (!createdComment?.success) {
    switch (createdComment?.type) {
      case 'Issue.NotExist':
        return res
          .status(404)
          .json({ success: false, error: createdComment.error })
        break
      default:
        return res.status(500).json({
          success: false,
          error: createdComment.error,
        })
    }
  }

  // 201 Created om alt går bra
  return res.status(201).json({
    success: true,
    data: createdComment.data,
  })
}
