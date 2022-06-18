import { useEffect, useState } from 'react'
import axios from 'axios'

export const useAllIssues = () => {
  const [allIssues, setAllIssues] = useState([])
  const [allDepartments, setAllDepartments] = useState([])

  useEffect(() => {
    if (allIssues && allIssues.length > 0) return
    const getAllIssues = async () => {
      try {
        const response = await axios.get('/api/issues/')
        if (response?.data?.success) {
          setAllIssues(response.data.data)
        }
      } catch (error) {
        console.log(error?.response?.data)
      }
    }
    getAllIssues()
  }, [allIssues])
  useEffect(() => {
    if (allDepartments && allDepartments.length > 0) return
    const getAllDepartments = async () => {
      try {
        const response = await axios.get('/api/departments/')
        if (response?.data?.success) {
          setAllDepartments(response.data.data)
        }
      } catch (error) {
        console.log(error?.response?.data)
      }
    }
    getAllDepartments()
  }, [allDepartments])

  return { allIssues, allDepartments }
}
