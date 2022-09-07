const exService = (req, res, next) => {
    try {
        res.status(200).send(`login successful for user ${req.headers["id"]}!`)
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send(`Not authorized to see this service!!!!! Error: ${error}`);
    }
}

module.exports = {
    exService,
};