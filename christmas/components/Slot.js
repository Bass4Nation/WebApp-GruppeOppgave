import { validate } from '@/lib/validation'
import { postUserSlotsCreate } from '@/lib/utils/postUserSlotsCreate'
import { useEffect, useState } from 'react'

const Slot = ({ slot, userSlots, setUserSlots }) => {
  const [userslotState, setUserslotState] = useState(false)
  const [userSlot, setUserSlot] = useState({})

  useEffect(() => {
    const data = userSlots.find((userSlot) => userSlot.slotId == slot.id)
    if (data) {
      setUserSlot(data)
      setUserslotState(true)
    }
  }, [userSlots])

  const oneDay = 24 * 60 * 60 * 1000

  const daysLeft = Math.ceil(
    Math.abs((new Date() - Date.parse(slot.openAt)) / oneDay)
  )

  const daysDiff = 'Åpner om ' + daysLeft + ' dager.'

  let textDisplay = slot?.order
  const date = validate.checkOpenDate(slot.openAt)

  const handler = async () => {
    if (date) {
      const userSlot = await postUserSlotsCreate(slot.id)
      if (userSlot?.data?.data) {
        const newUserSlot = userSlot.data.data
        setUserSlots([...userSlots, newUserSlot])
      }
    }
  }

  const available = (
    <section id={slot.slotId} onClick={handler} className="slot available">
      <p>{textDisplay}</p>
    </section>
  )

  const opened = (
    <section id={slot?.slotId} className="slot opened">
      <p>{userSlot?.coupon}</p>
    </section>
  )

  const unavailable = (
    <section id={slot?.slotId} className="slot unavailable">
      <div>
        <p>{textDisplay}</p>
        {daysLeft === 1 ? (
          <p className="openIn">Åpner om 1 dag.</p>
        ) : (
          <p className="openIn">{daysDiff}</p>
        )}
      </div>
    </section>
  )

  const availableOrNot = <>{userslotState ? opened : available}</>

  return <>{date ? availableOrNot : unavailable}</>
}

export default Slot
