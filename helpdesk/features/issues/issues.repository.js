import prisma from '@/lib/clients/db'

export const findMany = async () => {
  try {
    const issues = await prisma.issue.findMany()

    return { success: true, data: issues }
  } catch (error) {
    return { success: false, error: 'Failed finding issues' }
  }
}

export const create = async ({
  title,
  creator,
  description,
  severity,
  isResolved,
  created_at,
  departmentId,
}) => {
  try {
    const issue = await prisma.issue.create({
      data: {
        title,
        creator,
        description,
        severity,
        isResolved,
        created_at,
        departmentId,
      },
    })

    return { success: true, data: issue }
  } catch (error) {
    return { success: false, error: 'Failed to create issue' }
  }
}

export const exist = async (identifier) => {
  try {
    const issue = await prisma.issue.findUnique({
      where: {
        id: identifier,
      },
    })
    return { success: true, data: issue}
  } catch (error) {
    console.log(error)
    return { success: false, error: 'Failed finding issue' }
  }
}

export const updateById = async (id, { isResolved }) => {
  try {
    const issue = await prisma.issue.update({
      where: { id },
      data: { isResolved },
    })

    return { success: true, data: issue }
  } catch (error) {
    return { success: false, error: 'Failed updating issue' }
  }
}

export const removeById = async (id) => {
  try {
    const issue = await prisma.issue.delete({ where: { id } })

    return { success: true, data: issue }
  } catch (error) {
    return { success: false, error: 'Failed deleting issue' }
  }
}
