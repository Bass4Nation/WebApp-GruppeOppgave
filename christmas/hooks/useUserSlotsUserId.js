import { useEffect, useState } from 'react'
import axios from 'axios'

export const useUserSlotsOnUser = () => {
  const [userslots, setUserslots] = useState([])

  useEffect(() => {
    const getUserSlot = async () => {
      try {
        const response = await axios.get('api/userslots')
        if (response.data.success) {
          data = response.data.data
          setUserslots(data)
        } else {
          alert(response.data.error)
        }
      } catch (error) {
        console.log(
          `Status: ${error.response.status}\nError: ${error.response.data.error}`
        )
      }
    }

    getUserSlot()
  }, [])

  return { userslots }
}
