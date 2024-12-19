export const getRandomArrayElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
}

export const getRandomCityName = () => {
  return getRandomArrayElement([
    'Amsterdam',
    'Barcelona',
    'Copenhagen',
    'Dublin',
    'Edinburgh',
    'Frankfurt',
    'Geneva',
    'Helsinki',
    'Istanbul',
    'Jerusalem',
    'Lisbon',
    'Madrid',
    'Tallinn',
    'Vienna',
    'Warsaw',
    'Zurich'
  ])
}