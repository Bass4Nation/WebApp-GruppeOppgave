import axios from 'axios'
import { useEffect, useState } from 'react'

export const useComments = (issueId) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    if (comments && comments.length > 0) return
    const getComment = async () => {
      try {
        const response = await axios('/api/comments/' + issueId)
        if (response.data.success) {
          const data = response.data
          setComments(data)
        } else {
          alert(response.data.error)
        }
      } catch (error) {
        console.log('Viss code 500. Dvs ingen kommentarer på issue')
        console.log(error)
      }
    }

    getComment()
  }, [])

  return { comments }
}
