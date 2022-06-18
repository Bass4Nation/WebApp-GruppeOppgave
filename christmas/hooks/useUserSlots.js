import { useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from './useUser'

export const useUserSlots = (slotId) => {
  const [userslots, setUserslots] = useState([])
  const { users } = useUser()

  useEffect(() => {
    if (userslots && userslots.length > 0) return
    const getUserSlots = async () => {
      try {
        const response = await axios.get('/api/userslots/slot/' + slotId)
        if (response.data.success) {
          for (var i = 0; i <= users.length; i++) {
            // console.log(users[i]?.id)

            if (response.data.data.userId == users[i]?.id) {
              // console.log(users[i].id)
              const data = response?.data?.data
              setUserslots(data)
            }
          }
        } else {
          alert(response.data.error)
        }
      } catch (error) {
        console.log(
          `Status: ${error.response.status}\nError: ${error.response.data.error}`
        )
      }
    }

    getUserSlots()
  }, [])

  return { userslots }
}
