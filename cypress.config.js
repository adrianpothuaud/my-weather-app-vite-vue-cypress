import {defineConfig} from "cypress";

const isGithubActions = !!process.env.GITHUB_ACTIONS;

export default defineConfig({
  e2e: {
    baseUrl: isGithubActions ? "http://localhost:4173" : "http://localhost:5173",
    projectId: "c8e8t2",
    retries: isGithubActions ? 3 : 0,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
