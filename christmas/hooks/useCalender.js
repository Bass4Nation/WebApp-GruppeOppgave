import { useEffect, useState } from 'react'
import axios from 'axios'

export const useCalender = () => {
  const [calender, setCalender] = useState([])

  useEffect(() => {
    if (calender && calender.length > 0) return
    const getCalender = async () => {
      try {
        const response = await axios('/api/calenders/julekalender')
        if (response.data.success) {
          const data = response.data.data[0]
          setCalender(data)
        } else {
          alert(response.data.error)
        }
      } catch (error) {
        console.log(
          `Status: ${error.response.status}\nError: ${error.response.data.error}`
        )
      }
    }

    getCalender()
  }, [])

  return { calender }
}
