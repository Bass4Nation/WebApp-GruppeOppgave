export const get = async ({ state }) => {
  const myHints = state.selectedColors?.reduce(
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

  return myHints
}
