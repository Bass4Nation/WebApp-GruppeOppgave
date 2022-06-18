import { destroyCookie, parseCookies, setCookie } from 'nookies'

export const isAdmin = async (req) => {
  const cookie = parseCookies({ req })

  if (cookie?.admin) return true

  return false
}

export const getUserFromCookie = async (req) => {
  const cookie = parseCookies({ req })

  if (cookie?.user) return cookie.user

  return null
}

export const setUserCookie = (identifier, value) => {
  setCookie(null, identifier, value, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })
}

export const makeAdmin = () => {
  setUserCookie('admin', true)
}

export const removeAdmin = () => {
  destroyCookie({}, 'admin', {
    path: '/',
    expires: new Date(Date.now()),
  })
}

export const userInfo = async (req) => {
  const user = await getUserFromCookie(req)
  const admin = await isAdmin(req)

  return { user: user ? JSON.parse(user) : null, admin }
}
