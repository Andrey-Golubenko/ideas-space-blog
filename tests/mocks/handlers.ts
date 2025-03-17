// @ts-nocheck

import { http } from 'msw'

interface SignInResponse {
  status: number
}

interface SignInRequest {}
interface SignInContext {}

export const handlers = [
  http.post<SignInRequest, SignInContext, SignInResponse>(
    '/api/auth/signin',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ status: 200 }))
    }
  ),
  http.get('/api/categories', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        categories: [],
        count: 0
      })
    )
  })
  // Add other handlers as needed
]
