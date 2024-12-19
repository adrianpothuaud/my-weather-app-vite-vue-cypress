// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// GET

Cypress.Commands.add("getFavorites", () => {
  return cy.get('[data-cy=favorite-list]')
})

// ACT

Cypress.Commands.add("addFavorite", () => {
  cy.get('[data-cy=add-favorite-button]').click();
})

Cypress.Commands.add("init", () => {
  cy.visit('/')
  cy.clearAllCookies()
  cy.clearAllLocalStorage()
  cy.clearAllSessionStorage()
})

Cypress.Commands.add("removeFavorite", (place, from = "favorites") => {
  if (from === "favorites")
    cy.getFavorites().contains(place).find(`[data-cy=remove-favorite]`).click();
  else
    cy.get('[data-cy=weather-info]').find(`[data-cy=remove-favorite-button]`).click();
})

Cypress.Commands.add("usePlace", (place) => {
  cy.get('[data-cy=search-input]').type(place)
  cy.get('[data-cy=search-results]').should('be.visible')
  cy.get('[data-cy=search-result-item]').contains(place).click()
})

// STUB

Cypress.Commands.add("stubWeather", (weather) => {
  let weatherInfo = {}

  switch (weather) {
    case "shiny":
      weatherInfo = {
        coord: {lon: 2.3488, lat: 48.8534},
        weather: [{id: 800, main: "Clear", description: "clear sky", icon: "01d"}],
        base: "stations",
        main: {
          temp: 20,
          feels_like: 20,
          temp_min: 20,
          temp_max: 20,
          pressure: 1010,
          humidity: 50,
          sea_level: 1010,
          grnd_level: 1000
        },
        visibility: 10000,
        wind: {speed: 10, deg: 300},
        clouds: {all: 0},
        dt: 1734615110,
        sys: {type: 2, id: 2012208, country: "FR", sunrise: 1734594027, sunset: 1734623716},
        timezone: 3600,
        id: 2988507,
        name: "Paris",
        cod: 200
      };
      break;
    case "rainy":
      weatherInfo = {
        coord: {lon: 2.3488, lat: 48.8534},
        weather: [{id: 500, main: "Rain", description: "light rain", icon: "10d"}],
        base: "stations",
        main: {
          temp: 10,
          feels_like: 8,
          temp_min: 10,
          temp_max: 10,
          pressure: 1010,
          humidity: 80,
          sea_level: 1010,
          grnd_level: 1000
        },
        visibility: 10000,
        wind: {speed: 20, deg: 300},
        clouds: {all: 90},
        dt: 1734615110,
        sys: {type: 2, id: 2012208, country: "FR", sunrise: 1734594027, sunset: 1734623716},
        timezone: 3600,
        id: 2988507,
        name: "Paris",
        cod: 200
      };
      break;
    case "snowy":
      weatherInfo = {
        coord: {lon: 2.3488, lat: 48.8534},
        weather: [{id: 600, main: "Snow", description: "light snow", icon: "13d"}],
        base: "stations",
        main: {
          temp: 0,
          feels_like: -5,
          temp_min: 0,
          temp_max: 0,
          pressure: 1010,
          humidity: 90,
          sea_level: 1010,
          grnd_level: 1000
        },
        visibility: 10000,
        wind: {speed: 5, deg: 300},
        clouds: {all: 100},
        dt: 1734615110,
        sys: {type: 2, id: 2012208, country: "FR", sunrise: 1734594027, sunset: 1734623716},
        timezone: 3600,
        id: 2988507,
        name: "Paris",
        cod: 200
      };
      break;
    case "cloudy":
      weatherInfo = {
        coord: {lon: 2.3488, lat: 48.8534},
        weather: [{id: 803, main: "Clouds", description: "broken clouds", icon: "04d"}],
        base: "stations",
        main: {
          temp: 15,
          feels_like: 15,
          temp_min: 15,
          temp_max: 15,
          pressure: 1010,
          humidity: 70,
          sea_level: 1010,
          grnd_level: 1000
        },
        visibility: 10000,
        wind: {speed: 15, deg: 300},
        clouds: {all: 75},
        dt: 1734615110,
        sys: {type: 2, id: 2012208, country: "FR", sunrise: 1734594027, sunset: 1734623716},
        timezone: 3600,
        id: 2988507,
        name: "Paris",
        cod: 200
      };
      break;
    default:
      weatherInfo = {
        coord: {lon: 2.3488, lat: 48.8534},
        weather: [{id: 800, main: "Clear", description: "clear sky", icon: "01d"}],
        base: "stations",
        main: {
          temp: 20,
          feels_like: 20,
          temp_min: 20,
          temp_max: 20,
          pressure: 1010,
          humidity: 50,
          sea_level: 1010,
          grnd_level: 1000
        },
        visibility: 10000,
        wind: {speed: 10, deg: 300},
        clouds: {all: 0},
        dt: 1734615110,
        sys: {type: 2, id: 2012208, country: "FR", sunrise: 1734594027, sunset: 1734623716},
        timezone: 3600,
        id: 2988507,
        name: "Paris",
        cod: 200
      };
  }

  return cy.intercept('GET', '**/data/2.5/weather*', (req) => {
    req.alias = 'weather';
    req.reply({body: weatherInfo});
  });
})