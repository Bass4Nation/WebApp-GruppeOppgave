import axios from 'axios'

export const postUserSlotsCreate = async (slotId) => {
  let arr = {
    slotId: slotId,
  }

  try {
    const result = await axios.post('/api/userslots/create', arr)
    return result
  } catch (error) {
    console.log(
      `Status: ${error.response.status}\nError: ${error.response.data.error}`
    )
  }
}
