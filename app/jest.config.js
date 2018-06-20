const config = {
  verbose: true,
  collectCoverage: true,
  setupFiles: ['./jest.setup.js'],
  "collectCoverageFrom": [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/*.config.js",
    "!**/static/**",
    "!**/coverage/**",
    "!**/.next/**"
  ]
}

module.exports = config