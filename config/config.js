module.exports = {
  "development": {
    "url":process.env.DEV_DATABASE_URL,
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
