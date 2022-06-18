import SupportForm from "@/components/SupportForm"
import axios from 'axios'
import { useState, useEffect } from 'react'


const Create = () => {
  const [allDepartments, setAllDepartments] = useState([])


  const getAllDepartments = async () => {
    try {
      const response = await axios.get('/api/departments/')
      if(response?.data?.success){
        setAllDepartments(response?.data.data)
      }
    } catch (error) {
      console.log(error?.response?.data)
    }
  }

  useEffect(() => {
    getAllDepartments()
  }, [])


  return (
    <>
    <SupportForm departments={allDepartments} />
    </>
  )
}

export default Create
