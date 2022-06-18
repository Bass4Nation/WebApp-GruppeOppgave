import GetSlot from '@/components/GetSlot'
import { useCalender } from '@/hooks/useCalender'

const Dashboard = () => {
  const arrSlot = [
    { order: 1, open_at: '01.12.21' },
    { order: 2, open_at: '02.12.21' },
    { order: 3, open_at: '03.12.21' },
  ]

  const { calender } = useCalender()

  // const slots = arrSlot?.map((i) => <GetSlot item={i} />)

  const slots = calender?.slot?.map((i) => <GetSlot key={i.id} item={i} />)

  return (
    <>
      <h1>Admin</h1>
      {slots}
    </>
  )
}
export default Dashboard
