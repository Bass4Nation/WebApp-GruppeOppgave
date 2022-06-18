import * as issuesController from '@/features/issues/issues.controller'

export default async function handler(req, res) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'post':
      // kaller på kontrolleren som brukes til å lage ny feed
      await issuesController.createIssue(req, res)
      break
    case 'get':
      await issuesController.getIssueList(req, res)
      break
    default:
      res.status(405).end()
  }
}
