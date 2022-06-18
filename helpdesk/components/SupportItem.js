/* eslint-disable no-ternary */
import Link from 'next/link'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { postComment } from '@/lib/postComment'
import { useComments } from '@/hooks/useComments'

const SupportItem = ({ item, department }) => {
  let textInput = React.createRef()
  const router = useRouter()

  const severityHigh =
    item?.severity?.toString() === '3' ? (
      <p style={{ color: 'red', fontWeight: 'bold' }}>
        Høy <span className="dot1"></span>
      </p>
    ) : null
  const severityMedium =
    item?.severity?.toString() === '2' ? (
      <p style={{ color: 'orange', fontWeight: 'bold' }}>
        Medium <span className="dot2"></span>
      </p>
    ) : null
  const severityLow =
    item?.severity?.toString() === '1' ? (
      <p style={{ color: 'green', fontWeight: 'bold' }}>
        Lav <span className="dot3"></span>
      </p>
    ) : null

  const [commentState, setCommentState] = useState(false)
  const [addCommentState, setAddCommentState] = useState(false)
  const resolvedButton = item?.isResolved ? 'Ikke Løst?' : 'Avslutt'

  // ---------------- useState -------------------------
  const [comment, setComment] = useState(null)

  // ---------------- useEffect ------------------------
  const { comments } = useComments(item.id)

  // --------- Knapp for resolved ------------------
  const toggleResolved = (e) => {
    updateResolvedState()
    e.preventDefault()
    router.reload()
  }

  const updateResolvedState = async () => {
    try {
      axios.put('/api/issues/' + item.id, {
        // Poster det motsatte av det den er nå
        isResolved: !item.isResolved,
      })
    } catch (error) {
      console.log('ERROR:')
      console.log(error)
    }
  }

  // --------- Kommentar stuff ---------------------
  const toggleComment = (e) => {
    e.preventDefault()
    setCommentState((commentState) => !commentState)
  }
  const toggleAddComment = (e) => {
    e.preventDefault()
    setAddCommentState((addCommentState) => !addCommentState)
  }

  const handleCommentInput = (e) => {
    setComment(e.currentTarget.value)
  }

  // Sender komentaren til API
  const handleSendComment = (e) => {
    e.preventDefault()
    // Vil bare gå om kommentar ikke er null
    if (comment != null) {
      postComment(comment, item.id)
      // Reloader siden etter kommentaren er sendt til APIen
      router.reload()
    }
  }

  const addCommentField = (
    <form className="commentform" onSubmit={handleSendComment}>
      <div className="commentFormHeader">
        <label htmlFor="comment">Legg til kommentar</label>
        <button className="closeCommentBtn" onClick={toggleAddComment}>
          X
        </button>
      </div>
      <textarea
        id="comment"
        name="comment"
        onChange={handleCommentInput}
        ref={textInput}
        type="text"
        rows="4"
        maxLength="250"
      />
      <div>
        <button className="formSendBtn" type="submit">
          Send
        </button>
      </div>
    </form>
  )

  const showComments = (
    <section>
      {comments?.data?.map((comment, index) => (
        <div className="comment" key={index + 1}>
          <h4>Kommentar {index + 1}</h4>
          <p>{comment.comment}</p>
        </div>
      ))}
    </section>
  )

  // ------------ Vis hvem avdeling SupportItem er ------------
  const showDepartment = department
    ?.filter((choosen) => choosen.id.includes(item.departmentId))
    .map((op) => (
      <span key={op.id} value={op.id}>
        {op.name}
      </span>
    ))

  const date = item?.created_at

  return (
    <>
      <section key="issueKey" className="issue">
        <div className="meta">
          {showDepartment}
          <span id="severity">
            {severityHigh ?? severityMedium ?? severityLow}
          </span>
        </div>
        <Link href={`/issues/${encodeURIComponent(item?.id)}`}>
          <a>
            {item?.title} {item?.isResolved ? '(løst)' : ''}
          </a>
        </Link>
        <p>{item?.description}</p>
        <span>{item?.creator}</span>
        <footer>
          <span>{date ? new Date(date).toLocaleDateString('no') : null}</span>
          <div className="issue_actions">
            <button
              type="button"
              className={commentState ? 'activeState' : 'inactiveState'}
              onClick={toggleComment}
            >
              Se kommentarer (
              {comments?.data?.length > 0 ? comments?.data?.length : 0})
            </button>
            <button
              type="button"
              className={addCommentState ? 'activeState' : 'inactiveState'}
              onClick={toggleAddComment}
            >
              Legg til kommentar
            </button>
            <button type="button" onClick={toggleResolved}>
              {resolvedButton}
            </button>
          </div>
        </footer>
      </section>
      {commentState ? showComments : null}
      {addCommentState ? addCommentField : null}
    </>
  )
}

export default SupportItem
