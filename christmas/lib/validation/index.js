export const validate = {
  // Sjekker om luken er tilgjengelig 
  checkOpenDate(openDate) {
    let ToDate = new Date()

    if (ToDate > Date.parse(openDate)) return true

    return false
  },
  // Sjekke om maks lengden ikke er brutt
  checkOpenedState(){

  },
}
