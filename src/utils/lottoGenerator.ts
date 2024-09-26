export const generateCombinations = (): number[][] => {
  const allCombinations: number[][] = []
  for (let a = 1; a <= 40; a++) {
    for (let b = a + 1; b <= 41; b++) {
      for (let c = b + 1; c <= 42; c++) {
        for (let d = c + 1; d <= 43; d++) {
          for (let e = d + 1; d <= 44; e++) {
            for (let f = e + 1; f <= 45; f++) {
              allCombinations.push([a, b, c, d, e, f])
            }
          }
        }
      }
    }
  }
  return allCombinations
}

export const shuffleArray = (array: number[][]): number[][] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const generateUnluckyLottoNumbers = (): number[] => {
  const combinations = generateCombinations()
  const shuffled = shuffleArray(combinations)
  return shuffled[shuffled.length - 1]
}