import prisma from '@/lib/clients/db'

export const findMany = async () => {
  try {
    const departments = await prisma.department.findMany()

    return { success: true, data: departments }
  } catch (error) {
    return { success: false, error: 'Failed retriving departments' }
  }
}

export const create = async (data) => {
  // bruker try/catch for å håndtere feil gitt av Prisma
  try {
    // bruker prisma clienten til å lage departments
    // .create er metoden vi bruker for å lage noe
    const department = await prisma.department.create({ data })

    return { success: true, data: department }
  } catch (error) {
    return { success: false, error: 'Failed creating department' }
  }
}

export const exist = async (id) => {
  try {
    const department = await prisma.department.findUnique({
      where: {
        id: id,
      },
    })

    return { success: true, data: department }
  } catch (error) {
    return { success: false, error: 'Failed finding department' }
  }
}
