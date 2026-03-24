export default {
  "*.{ts,tsx,js,jsx}": [
    "biome format --write",
    "biome lint",
    "tsc --noEmit",
  ],
};
