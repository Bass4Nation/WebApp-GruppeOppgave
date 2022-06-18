export const generateCoupon = () => {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let nums = '0123456789'

  let coupon = []

  let charCounter = 0
  let numCounter = 0

  // Lager en coupon med 4 bokstaver og 4 tall, fortsetter til coupon har blitt fylt (8)
  while (coupon.length !== 8) {
    // Sjekker om det er trukket 4 bokstaver, og om Math.random() gir oss mindre enn 0.5
    // Math.random() < 0.5 ? Velge bokstav : Velge tall
    // charCounter sørger for at vi ikke får mer en 4 bokstaver, numCounter gjør det samme
    if (charCounter < 4 && Math.random() < 0.5) {
      // Vis true, velg char, legg til char i coupon, og increment charCounter
      let char = chars.charAt(Math.random() * chars.length)
      coupon.push(char)
      chars = chars.replace(char, '')
      charCounter++
    } else if (numCounter < 4) {
      // Vis true, velg number, legg til number i coupon, og increment numCounter
      let num = nums.charAt(Math.random() * nums.length)
      coupon.push(num)
      nums = nums.replace(num, '')
      numCounter++
    }
  }

  return coupon.join('')
}
