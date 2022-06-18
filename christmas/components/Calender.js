import Slot from './Slot'
import { useCalender } from '@/hooks/useCalender'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Calender = () => {
  const { calender } = useCalender()
  const [userSlots, setUserSlots] = useState([])

  const getUserSlot = async () => {
    try {
      const response = await axios.get('api/userslots')
      const data = response.data.data
      setUserSlots(data)
    } catch (error) {
      console.log(
        `Status: ${error.response.status}\nError: ${error.response.data.error}`
      )
    }
  }

  useEffect(() => {
    getUserSlot()
  }, [])

  return (
    <>
      <section className="calender">
        {calender?.slot?.map((slot) => (
          <Slot
            key={slot.id}
            slot={slot}
            userSlots={userSlots}
            setUserSlots={setUserSlots}
          />
        ))}
      </section>
    </>
  )
}

export default Calender
