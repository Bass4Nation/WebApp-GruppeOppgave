/* eslint-disable no-param-reassign */
import * as React from 'react'

import { createRows } from '@/lib/utils'
import axios from 'axios'

const GameContext = React.createContext()

export const colors = [
  'red',
  'green',
  'blue',
  'yellow',
  'orange',
  'pink',
  'cyan',
  'gray',
]

const rows = createRows(10)

const initialState = {
  game: null,
  rows,
  currentRow: 0,
  currentColor: null,
  colors,
  selectedColors: [],
  remaningColors: colors,
  foundCombination: false,
  isComplete: false,
}

const getRemainingColors = (selectedColors, currentColor) => {
  const availableColors = colors.filter((color) => color !== currentColor)
  const alreadySelectedIndex = selectedColors?.findIndex(
    (color) => color === currentColor
  )

  if (selectedColors?.length === 0) return availableColors

  if (alreadySelectedIndex > 0) {
    selectedColors[alreadySelectedIndex] = currentColor
  }

  return availableColors.filter((color) => !selectedColors?.includes(color))
}

function gameReducer(state, action) {
  const { payload } = action

  switch (action.type) {
    case 'picked_color': {
      return {
        ...state,
        currentColor: payload.color,
      }
    }
    case 'reset_picked_color': {
      return {
        ...state,
        currentColor: null,
      }
    }
    case 'set_hints': {
      const { hints } = payload
      const row = state.rows[state.currentRow]

      row.hints = hints

      return {
        ...state,
        rows: [...state.rows],
      }
    }
    case 'increase_row': {
      if (state.currentRow + 1 >= state.rows.length) {
        return {
          ...state,
          isComplete: true,
        }
      }

      return {
        ...state,
        currentRow: state.currentRow + 1,
        selectedColors: [],
        remaningColors: colors,
      }
    }
    case 'set_complete': {
      return {
        ...state,
        foundCombination: true,
        isComplete: true,
      }
    }
    case 'set_row_colors': {
      const { cell: cellName } = payload
      const row = state.rows[state.currentRow]
      const cellIndex = row.cells.findIndex(
        (rowCell) => rowCell.name === cellName
      )

      row.cells[cellIndex].background = state.currentColor
      state.selectedColors[cellIndex] = state.currentColor

      return {
        ...state,
        currentColor: null,
        remaningColors: getRemainingColors(
          state.selectedColors,
          state.currentColor
        ),
        rows: [...state.rows],
        selectedColors: [...state.selectedColors],
      }
    }
    case 'set_combination': {
      return {
        ...state,
        game: payload.game,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const GameProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(gameReducer, initialState)

  React.useEffect(() => {
    const getCombination = async () => {
      // TODO: Må kalle api for å hente rett kombinasjon
      const result = await axios.get('/api/dummy')

      dispatch({
        type: 'set_combination',
        payload: { game: result?.data },
      })
    }

    getCombination()
  }, [])
  const value = { state, dispatch }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

function useGameContext() {
  const context = React.useContext(GameContext)

  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider')
  }

  return context
}

export { GameProvider, useGameContext }
