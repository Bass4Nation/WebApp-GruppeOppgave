import axios from 'axios'

export const postComment = async (inputComment, id) => {
  let arr = {
    comment: inputComment,
    issueId: id,
  }

  console.log(arr)

  try {
    await axios.post('/api/comments', arr)
  } catch (error) {
    console.log(error)
  }
}
