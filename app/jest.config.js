const config = {
  verbose: true,
  collectCoverage: true,
  "collectCoverageFrom": [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/*.config.js",
    "!**/static/**",
    "!**/coverage/**"
  ]
}

module.exports = config