const exService = (req, res, next) => {
    try {
        console.log(req.body);
        res.status(200).json(`login successful for this user!`);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send(`Not authorized to see this service!!!!! Error: ${error}`);
    }
}

module.exports = {
    exService,
};