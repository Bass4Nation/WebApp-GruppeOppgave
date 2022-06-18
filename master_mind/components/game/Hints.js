import Hint from './Hint'
import { fillArray } from '@/lib/utils'

const Hints = ({ hints }) => {
  return (
    <>
      {fillArray('positionHints', hints?.positions).map((hint) => (
        <Hint key={hint.name} type="position" />
      ))}
      {fillArray('colorHints', hints?.colors).map((hint) => (
        <Hint key={hint.name} type="color" />
      ))}
    </>
  )
}

export default Hints
