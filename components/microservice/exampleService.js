const exService = (req, res, next) => {
    try {
        console.log("Req body ", req.headers["x-access-token"]);

        res.status(200).json({
            "message": "Order successful!",
            "x-access-token": req.headers["x-access-token"]
        });
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send(`Not authorized to see this service!!!!! Error: ${error}`);
    }
}

module.exports = {
    exService,
};