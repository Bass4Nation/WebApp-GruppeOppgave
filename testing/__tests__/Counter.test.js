import { act, renderHook } from '@testing-library/react-hooks'

import { useCounter } from '@/hooks/useCounter'

describe('Testing useCounter hook', () => {
  it('should add +1 to counter', () => {
    const { result } = renderHook(useCounter)

    act(() => result.current.add())
    expect(result.current.counter).toBe(1)
  })
  it('should subtract -1 to counter', () => {
    const { result } = renderHook(useCounter)

    act(() => result.current.subtract())
    expect(result.current.counter).toBe(-1)
  })
})
