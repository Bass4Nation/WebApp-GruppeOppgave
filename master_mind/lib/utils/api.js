import * as faker from 'faker'
import { parseCookies, setCookie } from 'nookies'

export const getUserFromCookie = async (req) => {
  const cookie = parseCookies({ req })

  if (cookie?.user) return cookie.user

  return null
}

function setUserCookie(username) {
  setCookie(null, 'user', username, {
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  })
}

const createRandomUser = () => {
  return faker.name.firstName().toLowerCase()
}

export const createUser = () => {
  setUserCookie(createRandomUser())
}
