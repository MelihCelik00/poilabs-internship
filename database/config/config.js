const { port } = require("pg/lib/defaults")

module.exports = {
  "development": {
    "url":"postgres://postgres:postgres@127.0.0.1:5433/poilabs",
    "dialect": "postgres",    
  },
  "test": {
    "url":process.env.DEV_DATABASE_URL,
    "dialect": "postgres",
  },
  "production": {
    "url":process.env.DEV_DATABASE_URL,
    "dialect": "postgres",    
  }
}
