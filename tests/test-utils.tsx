import { type ReactNode } from 'react'
import { render, RenderResult } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'

// Custom render function to include any necessary providers
const customRender = (
  ui: ReactNode,
  options = {}
): RenderResult & { user: UserEvent } => {
  const user = userEvent.setup()
  const renderResult = render(ui, { ...options })
  return { ...renderResult, user }
}

export * from '@testing-library/react'
export { customRender }
