// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { userInfo } from '@/lib/utils/user'

export default async function handler(req, res) {
  // Denne funksjonen kan du bruke der du trenger den får å få ut info om bruker
  // Du får tilbake f.eks { user: { id: 30, username: 'daphne' }, admin: false }
  const user = await userInfo(req)

  console.log(user)
  res.status(200).json({ message: 'Message from API' })
}
