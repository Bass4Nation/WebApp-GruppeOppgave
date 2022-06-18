/* eslint-disable no-ternary */
/* eslint-disable no-return-assign */
/* eslint-disable no-const-assign */
import { useState } from 'react'

import Stepper from '@/components/game/Stepper'
import Game from '@/components/steps/Game'
import Start from '@/components/steps/Start'

const steps = [
  { name: 'Start', component: <Start /> },
  { name: 'Spill', component: <Game /> },
]

export default function MasterMind() {
  const [step, setStep] = useState(0)

  const currentComponent = steps[step]

  return (
    <main>
      {currentComponent?.component}
      {step + 1 < steps.length ? (
        <Stepper step={step} setStep={setStep} steps={steps} />
      ) : null}
    </main>
  )
}
