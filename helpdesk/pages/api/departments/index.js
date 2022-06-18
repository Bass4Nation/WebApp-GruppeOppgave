import * as departmentController from '@/features/departments/departments.controller'

export default async function handler(req, res) {
  const { method } = req

  switch (method?.toLowerCase()) {
    case 'get':
      // kaller på kontrolleren som brukes til å hente alle departments
      await departmentController.getAllDepartments(req, res)
      break
    case 'post':
      // kaller på kontrolleren som brukes til å lage ny department
      await departmentController.createDepartment(req, res)
      break
    default:
      // gir 405 Method Not Allowed hvis brukeren prøver på noe annet
      // enn POST
      res.status(405).end()
  }
}
