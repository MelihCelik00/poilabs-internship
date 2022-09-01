const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:postgres@127.0.0.1:5433/poilabs');

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}