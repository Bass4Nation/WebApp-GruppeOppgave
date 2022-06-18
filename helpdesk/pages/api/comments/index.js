import * as commentController from '@/features/comments/comments.controller'

export default async function handler(req, res) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'post':
      // kaller på kontrolleren som brukes til å lage ny department
      await commentController.createComment(req, res)
      break
    default:
      // gir 405 Method Not Allowed hvis brukeren prøver på noe annet
      // enn POST
      res.status(405).end()
  }
}
