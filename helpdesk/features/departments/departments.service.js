import * as departmentRepo from './departments.repository'

export const getAllDepartments = async () => {
  const departments = await departmentRepo.findMany()

  if (!departments.success) {
    return { success: false, error: departments.error }
  }

  if (!departments.data.length > 0) {
    return {
      success: false,
      type: 'Department.NotExist',
      error: 'No departments found',
    }
  }

  return { success: true, data: departments.data }
}

export const create = async ({ email }) => {
  const department = await departmentRepo.exist({ email })

  // feil med hentingen av data fra databasen via ORM
  if (department?.error) return { success: false, error: department.error }

  // bruker finnes hvis data har verdi
  if (department.data)
    return { success: false, error: 'Department already exist' }

  const createdDepartment = await departmentRepo.create({ email })

  // feil ved lagring av bruker via ORM
  if (!createdDepartment.success)
    return { success: false, error: createdDepartment.error }

  return { success: true, data: createdDepartment.data }
}

export const getByUrl = async (id) => {
  const department = await departmentRepo.exist(id)

  if (!department.success) {
    return { success: false, error: department.error }
  }

  if (!department.data) {
    return {
      success: false,
      type: 'Department.NotExist',
      error: `Deparment with ${id} does not exist`,
    }
  }

  return { success: true, data: department.data }
}
