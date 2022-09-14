const jwt = require('jsonwebtoken')
const { responseGenerators, pino } = require('./../lib/utils')
const httpStatusCode = require('http-status-codes')
const logger = pino({ level: 'debug' });

const verifyToken = async (req, res, next) => {
    try {
        jwt.verify(req.headers.token, req.headers.user_id.toString(), function (error) {
            if (error) {
                return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.UNAUTHORIZED, 'You are not allowed to do this action', false))
            }
            next()
        })
    } catch (error) {
        logger.warn(`Error while verifing token : %j %s`, error, error)
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while verifing token', true))
    }
}

module.exports = {
    verifyToken
}