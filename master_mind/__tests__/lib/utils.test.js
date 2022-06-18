import { createCell, createPegs, createRow, createRows } from '@/lib/utils'

describe('Board', () => {
  describe('Creating cells', () => {
    it('should have 4 cells given 4 as argument', () => {
      const cells = createCell(4)

      expect(cells.length).toBe(4)
      expect(cells[0].name).toBe('cell-0')
      expect(cells[1].name).toBe('cell-1')
      expect(cells[2].name).toBe('cell-2')
      expect(cells[3].name).toBe('cell-3')
    })
  })

  describe('Creating pegs', () => {
    it('should have 4 pegs given 4 as argument', () => {
      const pegs = createPegs(4)

      expect(pegs.length).toBe(4)
      expect(pegs[0].name).toBe('peg-0')
      expect(pegs[1].name).toBe('peg-1')
      expect(pegs[2].name).toBe('peg-2')
      expect(pegs[3].name).toBe('peg-3')
    })
  })

  describe('Creating row', () => {
    it('should have a list of 4 pegs and cells given 4 as argument', () => {
      const row = createRow(4)

      expect(row.pegs.length).toBe(4)
      expect(row.cells.length).toBe(4)
    })
  })

  describe('Creating rows', () => {
    it('should have one row with 4 pegs and cells given 1 as argument', () => {
      const rows = createRows(1)

      expect(rows.length).toBe(1)
      expect(rows[0].name).toBe('row-0')
      expect(rows[0].pegs.length).toBe(4)
      expect(rows[0].cells.length).toBe(4)
    })

    it('should have 10 rows with 4 pegs and cells given 10 as argument', () => {
      const rows = createRows(10)

      // console.log(JSON.stringify(rows))
      expect(rows.length).toBe(10)
      expect(rows[9].name).toBe('row-9')
      expect(rows[9].pegs.length).toBe(4)
      expect(rows[9].cells.length).toBe(4)
    })
  })
})
