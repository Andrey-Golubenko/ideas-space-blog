import { vi } from 'vitest'

export const usePathname = vi.fn()
export const useRouter = vi.fn()
export const useSearchParams = vi.fn()
export const redirect = vi.fn()
export const back = vi.fn()

export const mockNextNavigation = () => {
  vi.mock('next/navigation', () => ({
    usePathname,
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      back,
      forward: vi.fn(),
      refresh: vi.fn()
    }),
    useSearchParams,
    redirect
  }))
}

export const mockUsePathname = (pathname: string) => {
  usePathname.mockReturnValue(pathname)
}

export const mockUseRouter = () => {
  const push = vi.fn()
  const replace = vi.fn()
  const forward = vi.fn()
  back.mockReset()

  useRouter.mockReturnValue({
    push,
    replace,
    back,
    forward,
    refresh: vi.fn()
  })

  return { push, replace, back, forward }
}

export const mockUseSearchParams = (params: Record<string, string>) => {
  const get = vi.fn((key: string) => params[key])
  useSearchParams.mockReturnValue({ get })
  return { get }
}
