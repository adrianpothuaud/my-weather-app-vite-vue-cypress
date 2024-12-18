import {defineConfig} from "cypress";

const isGithubActions = !!process.env.GITHUB_ACTIONS;

export default defineConfig({
  e2e: {
    baseUrl: isGithubActions ? "http://localhost:4173" : "http://localhost:5173",
    projectId: "c8e8t2",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
