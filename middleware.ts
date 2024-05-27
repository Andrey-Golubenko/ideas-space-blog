import { auth } from '~/lib/auth'
import { PATHS } from './constants'

export const config = { matcher: '/profile' }

// eslint-disable-next-line consistent-return
export default auth((req) => {
  if (!req.auth) {
    const url = req.nextUrl.origin.concat(PATHS.signIn)

    return Response.redirect(url)
  }
})
