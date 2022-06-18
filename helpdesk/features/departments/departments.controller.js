import * as departmentsService from './departments.service'

export const getAllDepartments = async (req, res) => {
  const departments = await departmentsService.getAllDepartments()

  if (!departments.success) {
    switch (departments?.type) {
      case 'Department.NotExist':
        return res
          .status(404)
          .json({ success: false, error: departments.error })
      default:
        return res
          .status(500)
          .json({ success: false, error: departments.error })
    }
  }

  return res.status(200).json({ success: true, data: departments.data })
}

export const createDepartment = async (req, res) => {
  const { name } = req.body

  // 400 Bad Request hvis navn mangler
  if (!name)
    return res
      .status(400)
      .json({ success: false, error: 'Missing required field: name' })

  const createdDepartment = await departmentsService.create({
    name,
  })

  // 500 Internal Server Error hvis noe går galt
  if (!createdDepartment?.success) {
    return res.status(500).json({
      success: false,
      error: createdDepartment.error,
    })
  }

  // 201 Created om alt går bra
  return res.status(201).json({
    success: true,
    data: createdDepartment.data,
  })
}

export const getDepartmentByUrl = async (req, res) => {
  const { url } = req.query

  if (!url) {
    return res.status(400).json({
      success: false,
      error: 'Missing departmentId',
    })
  }

  const department = await departmentsService.getByUrl(url)

  return res.status(200).json({
    success: true,
    data: department?.data,
  })
}
