const errorHandler = (err, req, res, next) => {
    const errorCode = 500
    res.status(errorCode).send("Server error.")
}

module.exports = errorHandler;