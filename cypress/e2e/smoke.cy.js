import {getRandomCityName} from "../support/randoms.js";

it('the smoke test', () => {
  // ✅ Search for places using the OpenWeather API
  // ✅ Add selected places to a list of favorites
  // ✅ Remove places from the list of favorites
  //    - ✅ from the favorites list
  //    - ✅ from the weather bloc
  // ✅ Conditionally render "Add to Favorites" and "Remove from Favorites" buttons based on whether the place is in the favorites list
  // TODO: improve and test that the remove from favorites button is displayed right after the add to favorites button is clicked
  // ✅ Hide the suggestions block when a place is selected
  // Fetch and display weather information for a selected place in a user-friendly format
  // ✅ Switch to a favorite place and fetch its weather information when clicked from the favorites list
  // ✅ Persist favorite places in local storage

  const place1 = getRandomCityName()
  const place2 = getRandomCityName()

  cy.step('Search for a place')
  cy.init()
  cy.usePlace(place1)
  cy.get('[data-cy=search-results]').should('not.exist')

  cy.step('Add place to favorites')
  cy.addFavorite()
  cy.getFavorites().should('contain', place1);
  cy.get('[data-cy=weather-info]').find('[data-cy=add-favorite-button]').should('not.exist');

  cy.step("Search for another place")
  cy.usePlace(place2)
  cy.get('[data-cy=search-results]').should('not.exist')

  cy.step('Add another place to favorites')
  cy.addFavorite()
  cy.getFavorites().should('contain', place2);
  cy.get('[data-cy=weather-info]').find('[data-cy=add-favorite-button]').should('not.exist');

  cy.step('Reload the app')
  cy.reload();

  cy.step('Go to place from favorites')
  cy.getFavorites().contains(place1).click();

  cy.step('Remove place from favorites from the weather bloc')
  cy.removeFavorite(place1, "place-weather");
  cy.getFavorites().should('not.contain', place1);

  cy.step('Remove place from favorites from the favorites list')
  cy.removeFavorite(place2);
  cy.getFavorites().should('not.contain', place2);

  cy.step('Display shiny weather')
  cy.stubWeather("shiny").as('weather');
  cy.usePlace(getRandomCityName());
  cy.wait('@weather');
  cy.get('[data-cy=weather-info]').contains('☀️');

  cy.step('Display rainy weather')
  cy.stubWeather("rainy").as('weather');
  cy.usePlace(getRandomCityName());
  cy.wait('@weather');
  cy.get('[data-cy=weather-info]').contains('🌧');

  cy.step('Display snowy weather')
  cy.stubWeather("snowy").as('weather');
  cy.usePlace(getRandomCityName());
  cy.wait('@weather');
  cy.get('[data-cy=weather-info]').contains('❄️');

  cy.step('Display cloudy weather')
  cy.stubWeather("cloudy").as('weather');
  cy.usePlace(getRandomCityName());
  cy.wait('@weather');
  cy.get('[data-cy=weather-info]').contains('☁️');
});
