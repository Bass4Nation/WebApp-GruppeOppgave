import Rows from '../game/Rows'
import { GameProvider } from '@/contexts/game-context'

const Game = () => {
  return (
    <GameProvider>
      <Rows />
    </GameProvider>
  )
}

export default Game
