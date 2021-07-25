// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
    if (err.statusCode) {
        res.status(err.statusCode).send({ message: err.message });
        return;
    } else if (err.name === "MongoError") {
        res.status(409).send({ message: "EmailReserved" })
    }
    else {
        res.status(500).send({ message: 'SomethingWentWrongOnServer' })
    }
}