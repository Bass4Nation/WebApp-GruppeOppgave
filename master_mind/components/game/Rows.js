/* eslint-disable no-param-reassign */
/* eslint-disable no-ternary */
import { useCallback } from 'react'

import ColorPicker from './ColorPicker'
import Row from './Row'
import Solution from './Solution'
import { useGameContext } from '@/contexts/game-context'
import axios from 'axios'
import { getUserFromCookie } from '@/lib/utils/api'

const Rows = () => {
  const { state, dispatch } = useGameContext()

  const isCurrentRow = useCallback(
    (rowNumber) => {
      return rowNumber === state?.currentRow
    },
    [state.currentRow]
  )

  // TODO: Denne må skrives om og bo i en service

  /*
  const getHints = () => {
    return state.selectedColors?.reduce(
      (hints, color, index) => {
        if (color === state.game.combination[index]) {
          hints.positions += 1
        } else if (state.game.combination.includes(color)) {
          hints.colors += 1
        }

        return hints
      },
      { positions: 0, colors: 0 }
    )
  }
  */

  // TODO: Skrives om til å kalle på api for å få hints som kan brukes til å oppdatere UI

  const handleRowSubmit = async (event) => {
    event.preventDefault()
    const response = await axios.post('/api/hints', state)
    const hints = response?.data
    //const hints = await getHints({ state })

    dispatch({ type: 'set_hints', payload: { hints } })
    if (hints?.positions === 4) {
      // TODO: Må lagre antall forsøk brukeren brukte på å løse oppgaven
      dispatch({ type: 'set_complete' })

      const result = await axios.post('/api/stats', {
        ...state,
        foundCombination: true,
        isComplete: true,
      })
    } else {
      // TODO: Må lagre at brukeren ikke klarte oppgaven når det ikke er flere forsøk igjen
      dispatch({ type: 'increase_row' })

      if (state.currentRow > state.rows.length - 2) {
        const result = await axios.post('/api/stats', {
          ...state,
          isComplete: true,
        })
      }
    }
  }

  const handleCellClick = (event) => {
    const { cell } = event.currentTarget.dataset

    if (state.currentColor) {
      dispatch({ type: 'set_row_colors', payload: { cell } })
    }
  }

  const handleSelectedColor = async (color) => {
    if (state?.currentColor === color) {
      dispatch({ type: 'reset_picked_color' })
    } else {
      dispatch({ type: 'picked_color', payload: { color } })
    }
  }

  return (
    <div className="rows">
      {state?.isComplete ? (
        <Solution
          row={state.rows[state.currentRow]}
          foundCombination={state?.foundCombination}
        />
      ) : null}
      {!state?.isComplete &&
        state?.rows?.map((row) => (
          <div className="row-wrapper" key={row?.name}>
            <form onSubmit={handleRowSubmit}>
              <div
                style={{
                  opacity: isCurrentRow(row?.number) ? 1 : 1,
                  pointerEvents: !isCurrentRow(row?.number) ? 'none' : 'auto',
                }}
              >
                <Row
                  name={row?.name}
                  number={row?.number}
                  hints={row?.hints}
                  pegs={row?.pegs}
                  cells={row?.cells}
                  handleCellClick={handleCellClick}
                />
                <button
                  disabled={state.selectedColors.length !== 4}
                  className=""
                  type="submit"
                >
                  Send
                </button>
              </div>
            </form>
            {isCurrentRow(row?.number) ? (
              <ColorPicker
                colors={state?.remaningColors}
                selectedColor={state?.currentColor}
                handleSelectedColor={handleSelectedColor}
              />
            ) : null}
          </div>
        ))}
    </div>
  )
}

export default Rows
