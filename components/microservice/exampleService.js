const exService = (req, res, next) => {
    try {
        res.status(200).send(`login successful with ${email} and ${password}`)
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send("Not authorized to see this service!!!!!");
    }
}

module.exports = {
    exService,
};