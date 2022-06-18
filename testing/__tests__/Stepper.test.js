/**
 * @jest-environment jsdom
 */

import { render, fireEvent, screen } from '@testing-library/react'
import { Stepper, steps } from '@/components/Stepper'

describe('Stepper component', () => {
  it('should render button', () => {
    render(<Stepper />)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
  })

  it('should have correct text content on button', () => {
    render(<Stepper />)

    const button = screen.getByRole('button')

    expect(button).toHaveTextContent('Game')
  })

  it('should update step-count and button content on click', async () => {
    render(<Stepper />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    // TODO: Somehow check what the state of step is

    expect(button).toHaveTextContent('End')
  })

  it('should remove button when step count is higher than amount of steps', async () => {
    render(<Stepper />)

    const button = screen.getByRole('button')
    for (let i = 0; i < steps.length - 1; i++) {
      fireEvent.click(button)
    }

    expect(button).not.toBeInTheDocument()
  })
})
