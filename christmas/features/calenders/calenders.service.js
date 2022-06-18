import * as calendersRepo from './calenders.repository'

export const checkIfExist = async (calenderId) => {
  const calender = await calendersRepo.findUnique(calenderId)

  if (!calender.success) {
    return { success: false, error: calender.error }
  }

  if (!calender.data) {
    return {
      success: false,
      type: 'Calender.NotExist',
      error: `Calender with id: ${calenderId} does not exist`,
    }
  }

  return { success: true }
}

export const getAll = async () => {
  const calenders = await calendersRepo.findMany()

  if (!calenders.success) {
    return { success: false, error: calenders.error }
  }

  if (!calenders.data.length > 0) {
    return {
      success: false,
      type: 'Calender.NotExist',
      error: `Could not find any Calenders in the database`,
    }
  }

  return { success: true, data: calenders.data }
}

export const getCalender = async (name) => {
  const calender = await calendersRepo.findManyWithName(name)

  if (!calender.success) {
    return { success: false, error: calender.error }
  }

  if (!calender.data.length > 0) {
    return {
      success: false,
      type: 'Calender.NotExist',
      error: `Could not find Calender with name: ${name}`,
    }
  }

  return { success: true, data: calender.data }
}
