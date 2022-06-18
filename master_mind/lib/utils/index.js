export const fillArray = (name, size) =>
  Array(size)
    .fill()
    .map((_, i) => ({ name: `${name}-${i}` }))

export const createCell = (cells) => fillArray('cell', cells)

export const createPegs = (pegs) =>
  Array(pegs)
    .fill()
    .map((_, i) => ({ name: `peg-${i}` }))

export const createRow = (n = 4) => {
  return {
    pegs: createPegs(n),
    cells: createCell(n),
    hints: null,
  }
}

export const createRows = (rows) =>
  Array(rows)
    .fill()
    .map((_, rowIndex) => ({
      number: rowIndex,
      name: `row-${rowIndex}`,
      ...createRow(),
    }))
