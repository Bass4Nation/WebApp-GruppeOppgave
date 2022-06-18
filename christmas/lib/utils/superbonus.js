export const superbonus = (deltakere) => {
  const antallDeltakere = deltakere.length
  const vinner = deltakere[Math.floor(Math.random() * antallDeltakere)]

  return vinner
}
