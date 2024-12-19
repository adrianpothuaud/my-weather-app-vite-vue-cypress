declare namespace Cypress {
    interface Chainable<Subject = any> {
        // GET
        getFavorites(): Cypress.Chainable<JQuery<HTMLElement>>

        // ACT
        addFavorite(): void

        init(): void

        removeFavorite(place: any, from?: "favorites" | "place-weather"): void

        usePlace(place: string): void

        // STUB
        stubWeather(kind: "shiny" | "rainy" | "cloudy" | "snowy"): Chainable<null>
    }
}