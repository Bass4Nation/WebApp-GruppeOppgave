/* eslint-disable no-ternary */
const Stepper = ({ steps, step, setStep }) => {
  return (
    <button
      style={{ marginTop: '2rem' }}
      type="button"
      onClick={() => setStep(step + 1)}
    >
      {steps[step + 1].name}
    </button>
  )
}

export default Stepper
