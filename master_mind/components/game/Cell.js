const Cell = ({ row, name, background, handleCellClick }) => {
  return (
    <div className="cell">
      <button
        className="cellButton"
        type="button"
        style={{ backgroundColor: background }}
        data-row={row?.number}
        data-cell={name}
        onClick={handleCellClick}
      ></button>
    </div>
  )
}

export default Cell
