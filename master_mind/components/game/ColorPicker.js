/* eslint-disable no-nested-ternary */
const ColorPicker = ({ colors, selectedColor, handleSelectedColor }) => {
  return (
    <ul className="colorPicker">
      {colors.map((color) => (
        <li key={color} data-testid="color">
          <button
            style={{
              backgroundColor: color,
              opacity: selectedColor ? (selectedColor === color ? 1 : 0.2) : 1,
            }}
            disabled={selectedColor && selectedColor !== color}
            onClick={() => handleSelectedColor(color)}
          ></button>
        </li>
      ))}
    </ul>
  )
}

export default ColorPicker
