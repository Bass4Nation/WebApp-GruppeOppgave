import * as issuesRepo from './issues.repository'
import * as departmentsRepo from '@/features/departments/departments.repository'

export const list = async () => {
  const issues = await issuesRepo.findMany()

  if (!issues.success) {
    return { success: false, error: issues.error }
  }

  if (!issues.data) {
    return { success: false, type: 'Issue.NotExist', error: issues.error }
  }

  return { success: true, data: issues.data }
}

export const getByUrl = async (url) => {
  const issue = await issuesRepo.exist(url)

  if (!issue.success) {
    return { success: false, error: issue.error }
  }

  if (!issue.data) {
    return {
      success: false,
      type: 'Issue.NotExist',
      error: `Issue with ${url} does not exist`,
    }
  }

  return { success: true, data: issue.data }
}

export const create = async ({
  title,
  creator,
  description,
  severity,
  departmentId,
}) => {
  // sjekker om deparment finnes for å sikre at vi
  // kan lage en relasjon mellom department og issue
  const department = await departmentsRepo.exist(departmentId) //Department

  if (!department.success) {
    return { success: false, error: department?.error }
  }

  if (!department.data) {
    return {
      success: false,
      type: 'Department.NotExist',
      error: `${departmentId} does not exist`,
    }
  }

  // sender nødvendig data for å lage en feed
  const createdIssue = await issuesRepo.create({
    title,
    creator,
    description,
    severity,
    isResolved: false,
    created_at: new Date(),
    departmentId,
  })

  if (!createdIssue.success) {
    return { success: false, error: createdIssue.error }
  }

  return { success: true, data: createdIssue.data }
}

export const putByUrl = async (url, data) => {
  const issue = await issuesRepo.exist(url)

  if (!issue.success) {
    return { success: false, error: issue.error }
  }

  if (!issue.data) {
    return {
      success: false,
      type: 'Issue.NotExist',
      error: `Issue with ${url} does not exist`,
    }
  }

  if (data?.url) {
    const issueWithUpdateUrl = await issuesRepo.exist({ url: data.url })

    if (issueWithUpdateUrl?.data) {
      return {
        success: false,
        type: 'Issue.Duplicate',
        error: `Item with ${data.url} already exists`,
      }
    }
  }

  const updatedIssue = await issuesRepo.updateById(issue.data.id, data)

  if (!updatedIssue.success) {
    return { success: false, error: updatedIssue.error }
  }

  return { success: true, data: updatedIssue.data }
}
