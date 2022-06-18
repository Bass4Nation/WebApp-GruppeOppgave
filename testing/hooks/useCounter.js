import { useState } from 'react'

export function useCounter() {
  const [counter, setCounter] = useState(0)

  const add = () => {
    setCounter(counter + 1)
  }

  const subtract = () => {
    setCounter(counter - 1)
  }

  return { counter, add, subtract }
}
