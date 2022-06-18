/* eslint-disable no-nested-ternary */
/* eslint-disable no-ternary */
const Hint = ({ type }) => (
  <div
    className="peg"
    style={{
      backgroundColor:
        type === 'position'
          ? 'black'
          : type === 'color'
          ? 'grey'
          : 'transparent',
    }}
  ></div>
)

export default Hint
