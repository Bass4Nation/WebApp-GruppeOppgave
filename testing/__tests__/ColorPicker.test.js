/**
 * @jest-environment jsdom
 */

import ColorPicker from '@/components/ColorPicker'
import { fireEvent, render, screen } from '@testing-library/react'

describe('ColorPicker', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render a list of all colors passed to it', () => {
    render(<ColorPicker colors={['Green', 'Blue', 'Red']} />)

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByTestId('color')).toHaveLength(3)
  })

  it('should have disabled button if color does not match', () => {
    render(
      <ColorPicker colors={['Green', 'Blue', 'Red']} selectedColor="Yellow" />
    )

    const greenBtn = screen.getAllByRole('button')[0]
    expect(greenBtn).toBeDisabled()
  })

  it('should have one active button if color match', () => {
    render(
      <ColorPicker colors={['Green', 'Blue', 'Red']} selectedColor="Green" />
    )

    const buttons = screen.getAllByRole('button')
    const greenBtn = buttons[0]
    const blueBtn = buttons[1]
    const redBtn = buttons[2]

    expect(greenBtn).toBeEnabled()
    expect(blueBtn).toBeDisabled()
    expect(redBtn).toBeDisabled()
  })

  it('should have called onClick on button', async () => {
    const props = {
      colors: ['Green', 'Blue', 'Red'],
      selectedColor: 'Green',
      handleSelectedColor: jest.fn(),
    }

    render(<ColorPicker {...props} />)

    const greenBtn = screen.getAllByRole('button')[0]
    fireEvent.click(greenBtn)
    expect(props.handleSelectedColor).toHaveBeenCalled()
  })

  it('should not have called onClick on disabled button', async () => {
    const props = {
      colors: ['Green', 'Blue', 'Red'],
      selectedColor: 'Blue',
      handleSelectedColor: jest.fn(),
    }

    render(<ColorPicker {...props} />)

    const greenBtn = screen.getAllByRole('button')[0]
    fireEvent.click(greenBtn)
    expect(props.handleSelectedColor).toHaveBeenCalledTimes(0)
  })

  it('should updated selectedColor and active buttons on click', async () => {
    let props = {
      colors: ['Green', 'Blue', 'Red'],
      selectedColor: null,
      handleSelectedColor: jest.fn(() => {
        props.selectedColor = 'Green'
      }),
    }

    const { rerender } = render(<ColorPicker {...props} />)

    const allButtons = screen.getAllByRole('button')
    const greenBtn = allButtons[0]
    const blueBtn = allButtons[1]
    const redBtn = allButtons[2]

    const randomNumber = Math.floor(Math.random() * allButtons.length)

    fireEvent.click(allButtons[randomNumber])
    expect(props.handleSelectedColor).toHaveBeenCalled()
    rerender(<ColorPicker {...props} />)

    expect(props.selectedColor).toEqual('Green')
    expect(greenBtn).toBeEnabled()
    expect(blueBtn).toBeDisabled()
    expect(redBtn).toBeDisabled()
  })
})
