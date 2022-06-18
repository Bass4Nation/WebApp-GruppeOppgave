// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getUserFromCookie } from '@/lib/utils/api'
import { colors } from '@/contexts/game-context'

export default async function handler(req, res) {
  // Funksjon brukt for å hente ut hvem som prøver applikasjone
  // Du kan kopiere denne linjen til dere du måtte trenge den
  // Trenger den for å knytte brukeren som spiller til spillet
  const user = await getUserFromCookie(req)

  if (user) {
    console.log(user)
  }

  let availableColors = colors
  console.log(availableColors)
  let newCombination = []

  for (let i = 1; i <= 4; i++) {
    let random = Math.floor(Math.random() * availableColors.length)
    newCombination.push(availableColors[random])
    availableColors.splice(random, 1)
  }

  console.log(newCombination)

  res.status(200).json({ combination: newCombination })
}
