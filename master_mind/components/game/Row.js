/* eslint-disable no-ternary */
import Cell from './Cell'
import Hints from './Hints'
import Peg from './Peg'

const Row = ({ name, number, pegs, cells, hints, handleCellClick }) => {
  return (
    <div className="row">
      <p>{number + 1}</p>
      <div className="cells">
        {cells?.map((cell) => (
          <Cell
            key={cell?.name}
            row={{ name, number }}
            name={cell?.name}
            background={cell?.background ?? 'transparent'}
            handleCellClick={handleCellClick}
          />
        ))}
      </div>
      <div className="pegs">
        {hints && Object.keys(hints)?.length > 0 ? (
          <Hints hints={hints} />
        ) : (
          pegs?.map((peg) => <Peg key={peg?.name} />)
        )}
      </div>
    </div>
  )
}

export default Row
