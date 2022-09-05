// this script contains signup and login methods which are the two main functions

// import modules
const bcrypt = require("bcrypt");
const db = require("../../models");
const jwt = require("jsonwebtoken");
const { log } = require("console");

const auth = require("basic-auth")

// assigning user to the variable User
const User = db.users;

// sign user up
// hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const data = {
            username,
            email,
            password: await bcrypt.hash(password, 10),
        };
        // save the user
        const user = await User.create(data);

        // if user details is captured
        // generate token with the user's id and the secretKey in the env file
        // set cookie with the token granted
        if (user) {
            let token = jwt.sign({ id:user.id }, process.env.secretKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            res.cookie("jwt", token, {maxAge: 1 * 24 * 60 * 60, httpOnly: true});
            console.log("user", JSON.stringify(user, null, 2));
            console.log(token);

            // send user details
            return res.status(201).send(user);
        }else{
            return res.status(409).send("Details are not correct!");
        }
    } catch (error) {
        console.log(error);
    }
};

// login authentication

const login = async (req, res) => {
    try {
        // const { email, password } = req.body;
        let userAuth = auth(req);  // => { name: 'something', pass: 'whatever' }
        // console.log(userAuth);  // Credentials { name: 'testmail1@testmail.com', pass: 'pwd1' }
        
        // find a user by their email
        const user = await User.findOne({
            where: {email: userAuth.name}
        });

        // if user email is found, compare password with bycrypt
        if (user) {
            const isSame = await bcrypt.compare(userAuth.pass, user.password);
            
            // if password is same
            // generate a token with the user's id and the secretKey in the env file
            if (isSame) {
                let token = jwt.sign({id: user.id}, process.env.secretKey, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });
                res.status(201).send(`login successful with ${userAuth.name} and ${userAuth.pass}`);
                //if password matches wit the one in the database
                //go ahead and generate a cookie for the user
                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                console.log("user", JSON.stringify(user, null, 2));
                console.log(token);
                res.JSON({ token });
                // send user data
                return res.status(201).send(user);
            } else {
                return res.status(401).send("Authentication failed");
            }
        } else {
            return res.status(401).send("Authentication failed");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    signup,
    login,
};