'use strict';  // it is a literal expression to prevent usage of undeclared variables
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {  // association is a static method to let model know foreign keys
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

/*
const User = sequelize.define('User',{
    id : {
      type: DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement: true  
    },
    username: {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
        // primaryKey : true 
    },
    password: {
        type : DataTypes.STRING,
        allowNull : false
    },
    email: {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
        // primaryKey : true
    },
}, {timestamps: true},);
  return User;
*/