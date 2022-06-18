import * as commentController from '@/features/comments/comments.controller'

export default async function handler(req, res) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'get':
      await commentController.getCommentsOnIssue(req, res)
      break
    default:
      res.status(405).end()
  }
}
