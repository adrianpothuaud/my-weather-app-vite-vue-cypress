import {defineConfig} from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    projectId: "c8e8t2",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
