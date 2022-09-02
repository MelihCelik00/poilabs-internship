// this scripts works but not a best practice
// because this handles the database operations manually so that does not make the best effort

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:postgres@127.0.0.1:5433/poilabs');

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
};

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
    }
});


console.log(User === sequelize.models.User); // true

User.sync()

AddUser("MelihCelik00", "1234", "melihsafa.c1@gmail.com");
AddUser("melihcelik00", "123456", "melihsafa.c2@gmail.com");
AddUser("MelihCelik00", "123456789", "melihsafa.c3@gmail.com");
AddUser("FarklıUserAynıMail", "sifre123", "melihsafa.c@gmail.com");
AddUser("FarklıUserAynıMail2", "sifre123", "melihsafa.c1@gmail.com");


async function AddUser(_username, _password, _email){

    await User.create({
        username: _username,
        password:_password,
        email: _email 
    });
    await User.sync()
}; 

module.exports = {
    AddUser,
}


