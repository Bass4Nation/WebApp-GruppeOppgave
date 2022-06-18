import { useState } from 'react'
import { useUserSlots } from '@/hooks/useUserSlots'
import { superbonus } from '@/lib/utils/superbonus'

const GetSlot = ({ item }) => {
  const { userslots } = useUserSlots(item?.id)

  const [windowState, setWindowState] = useState(false)
  const [seeAllParticipantsState, setSeeAllParticipantsState] = useState(false)
  const [bonusWinner, setBonusWinner] = useState({})

  // ---------------- SUPERBONUS ---------------

  const handleSuperBonusBtn = () => {
    setBonusWinner(superbonus(userslots))
    setWindowState(true)
  }
  const handleSuperBonusCloseBtn = () => {
    setWindowState(false)
  }

  const superBonusWindow = (
    <section className="showSuperBonus">
      <section>
        <button onClick={handleSuperBonusCloseBtn} className="close">
          X
        </button>
        <p className="top">Superbonus, luke {item.order}</p>
        <p className="vinner">
          Bruker ID: {bonusWinner?.user?.id}, Navn:{' '}
          <span className="winnerName">{bonusWinner?.user?.username}</span>
        </p>
      </section>
    </section>
  )
  // -------------------------------------------
  const tableInfo = userslots.slice(0, 3).map((i, index) => (
    <tr key={i.id} className="getSlotTableInfo">
      <td className="getSlotTableId">{index + 1}</td>
      <td className="getSlotTableUsername">{i?.user.username}</td>
      <td className="getSlotTableDate">
        {new Date(i?.createdAt).toLocaleDateString('no')}
      </td>
      <td className="getSlotTableCode">{i?.coupon}</td>
    </tr>
  ))

  const handleSeeAllBtn = () => {
    setSeeAllParticipantsState(true)
  }
  const handleSeeAllCloseBtn = () => {
    setSeeAllParticipantsState(false)
  }

  const seeAllParticipants = (
    <section className="seeAllParticipants">
      <section>
        <button onClick={handleSeeAllCloseBtn} className="close">
          X
        </button>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Brukernavn</th>
              <th>Dato for deltakelse</th>
              <th>Kode</th>
            </tr>
          </thead>
          <tbody>
            {userslots.map((i) => (
              <tr key={i.id}>
                <td key={i.user.id}>{i?.user.id}</td>
                <td key={i.user.username}>{i?.user.username}</td>
                <td key={i.createdAt}>
                  {new Date(i?.createdAt).toLocaleDateString('no')}
                </td>
                <td key={i.coupon}>{i?.coupon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  )

  return (
    <>
      <section className="getSlotBorder">
        <p className="slotNumber">Luke: {item.order}</p>
        <p className="slotOpenAt">
          Tilgjengelig fra {new Date(item.openAt).toLocaleDateString('no')}
        </p>
        <button className="slotSeeAll" onClick={handleSeeAllBtn}>
          Se alle deltakere({userslots.length})
        </button>
        <button className="slotSuperbonus" onClick={handleSuperBonusBtn}>
          Trekk superbonus
        </button>
        <section>
          <table className="getSlotTable">
            <thead>
              <tr>
                <th className="getSlotTableId">#</th>
                <th className="getSlotTableUsername">Brukernavn</th>
                <th className="getSlotTableDate">Dato for deltakelse</th>
                <th className="getSlotTableCode">Kode</th>
              </tr>
            </thead>
            <tbody>{tableInfo}</tbody>
          </table>
        </section>
        {windowState ? superBonusWindow : null}
        {seeAllParticipantsState ? seeAllParticipants : null}
      </section>
    </>
  )
}

export default GetSlot
