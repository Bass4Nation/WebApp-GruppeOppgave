export const validate = {
  // Sjekker om minste kravet med tegn er oppfylt
  minLength(length, value) {
    // Mer eller lik som lengden satt
    if (length && value?.length >= length) return true
    // alert('Må være minst ' + length + ' characters for å sende inn')
    return false
  },
  // Sjekke om maks lengden ikke er brutt
  maxLength(length, value) {
    // Mindre eller lik som lengden satt
    if (length && value?.length <= length) return true

    return false
  },
  // Sjekker om det er Storbokstav på starten av ordet/navnet.
  isCapitalLetter(word) {
    const splittedWord = word.split(' ')
    var count = 0
    // Skal sjekke om første bokstav er oppercase.
    for (var i = 0; i < splittedWord.length; i++) {
      if (
        splittedWord[i].charAt(0) === splittedWord[i].charAt(0).toUpperCase()
      ) {
        count++
      }
    }
    // Sjekker om at antall "BESTÅTT IF TESTEN" er like mange som antall ord i stringen.
    if (splittedWord.length == count) return true

    return false
  },
  mustHaveFirstnameAndLastname(word) {
    const splittedWord = word.split(' ')

    if (2 <= splittedWord.length) {
      return true
    }

    return false
  },
  isValidSeverity(severity) {
    if (severity === 1) {
      return true
    } else if (severity === 2) {
      return true
    } else if (severity === 3) {
      return true
    }

    return false
  },
}
