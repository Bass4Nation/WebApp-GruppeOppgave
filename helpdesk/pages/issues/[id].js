import { useRouter } from 'next/router'
import axios from 'axios'
import { useState, useEffect } from 'react'
import SupportItem from '@/components/SupportItem'

const Issue = () => {
  const router = useRouter()
  const { id } = router.query

  const [issue, setIssue] = useState([])

  const getIssue = async () => {
    try {
      const response = await axios.get(`/api/issues/${id}`)
      if (response?.data?.success) {
        setIssue(response.data.data)
      }
    } catch (error) {
      console.log(error?.response?.data)
    }
  }

  useEffect(() => {
    if (!router.isReady) return
    getIssue()
  }, [router.isReady])

  return (
    <>
      <main>
        <SupportItem key={issue.id} item={issue} />
      </main>
    </>
  )
}

export default Issue
