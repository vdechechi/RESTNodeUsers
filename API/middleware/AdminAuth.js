const jwt = require("jsonwebtoken");
const secret = 'jabdskasbdkasbdasbduviviavdavdascyduyhac';

module.exports = function (req, res, next) {
    const authToken = req.headers['authorization'];

    if (authToken !== undefined) {
        const bearer = authToken.split(' ');
        const token = bearer[1];

        try {
            const decoded = jwt.verify(token, secret);
            if (decoded.role == 1) {
                next();
            } else {
                res.status(403)
                res.send("Você não tem permissao para isso")
            }

        } catch (err) {
            console.error(err); // Log the error for debugging purposes
            res.status(403).send("Você não está autenticado");
        }
    } else {
        res.status(403).send("Você não está autenticado");
    }
};
