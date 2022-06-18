/* eslint-disable no-ternary */
import Cell from './Cell'
import Hints from './Hints'

const Solution = ({ row, foundCombination }) => {
  return (
    <>
      <h2>
        {foundCombination
          ? 'Du fant riktig kombinasjon'
          : 'Du fant ikke rett kombinasjon, prøv igjen'}
      </h2>
      <div className="row">
        <p>{row.number + 1}</p>
        <div className="cells">
          {row?.cells?.map((cell) => (
            <Cell
              key={cell?.name}
              row={{ name: row.name, number: row.number }}
              name={cell?.name}
              background={cell?.background ?? 'transparent'}
            />
          ))}
        </div>
        <div className="pegs">
          <Hints hints={row?.hints} />
        </div>
      </div>
    </>
  )
}

export default Solution
