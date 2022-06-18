import * as issuesService from '@/features/issues/issues.service'
import { validate } from '@/lib/validation'

export const getIssueList = async (req, res) => {
  const issues = await issuesService.list()

  if (!issues.success) {
    switch (issues?.type) {
      case 'Issue.NotExist':
        return res
          .status(404)
          .json({ success: false, error: 'No Issues exist' })
      default:
        return res.status(500).json({ success: false, error: issues.error })
    }
  }

  return res.status(200).json({ success: true, data: issues.data })
}

// POST
// /api/issues
export const createIssue = async (req, res) => {
  // TODO: Validate fields => Happy path
  const { title, creator, description, severity, departmentId } = req.body

  if (
    // title
    !title ||
    !validate.minLength(25, title) ||
    !validate.maxLength(150, title) ||
    // creator
    !creator ||
    !validate.isCapitalLetter(creator) ||
    !validate.mustHaveFirstnameAndLastname(creator) ||
    // description
    (!description && !validate.maxLength(250, description)) ||
    // severity
    !severity ||
    !validate.isValidSeverity(severity) ||
    // department
    !departmentId
  ) {
    return res.status(400).json({
      success: false,
      error: 'Required fields either missing or using incorrect format',
    })
  }
  const createdIssue = await issuesService.create({
    title,
    creator,
    description,
    severity,
    departmentId,
  })

  // Sjekker hva slags feil servicen gir
  // Dette for å sikre rett statuskode
  if (!createdIssue.success) {
    switch (createdIssue?.type) {
      case 'Issue.Duplicate':
        return res.status(409).json({
          success: false,
          error: createdIssue.error,
        })
      case 'Department.NotExist':
        return res.status(404).json({
          success: false,
          error: createdIssue.error,
        })
      default:
        return res.status(500).json({
          success: false,
          error: createdIssue.error,
        })
    }
  }

  return res.status(201).json(createdIssue)
}

export const getIssueByUrl = async (req, res) => {
  const { url } = req.query

  if (!url)
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: name, url or email',
    })

  const issue = await issuesService.getByUrl(url)

  if (!issue?.success) {
    switch (issue?.type) {
      case 'Issue.NotExist':
        return res.status(404).json({
          success: false,
          error: issue.error,
        })
      default:
        return res.status(500).json({
          success: false,
          error: issue.error,
        })
    }
  }

  return res.status(200).json(issue)
}

// PUT
// /api/issues/{url}
// /api/issues/www.myurl.com
// BODY: {name: ..., url: ...}
export const updateIssueByUrl = async (req, res) => {
  const { url } = req.query
  const data = req.body

  if (!url)
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: url',
    })

  const issue = await issuesService.putByUrl(url, data)

  if (!issue?.success) {
    switch (issue?.type) {
      case 'Issue.NotExist':
        return res.status(404).json({
          success: false,
          error: issue.error,
        })
      case 'Issue.Duplicate':
        return res.status(409).json({
          success: false,
          error: issue.error,
        })
      default:
        return res.status(500).json({
          success: false,
          error: issue.error,
        })
    }
  }

  return res.status(200).json(issue)
}

// DELETE
// /api/issues/{url}
// /api/issues/www.myurl.com
export const removeIssuebyUrl = async (req, res) => {
  const { url } = req.query

  if (!url)
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: name, url or email',
    })

  const removedIssue = await issuesService.deleteByUrl({
    url,
  })

  if (!removedIssue?.success) {
    switch (removedIssue?.type) {
      case 'Issue.NotExist':
        return res.status(404).json({
          success: false,
          error: removedIssue.error,
        })
      default:
        return res.status(500).json({
          success: false,
          error: removedIssue.error,
        })
    }
  }

  return res.status(204).end()
}
