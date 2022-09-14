const userService = require('../services/user')
const httpStatusCode = require('http-status-codes')
const { responseGenerators, bcrypt, generateToken, pino } = require('./../lib/utils')
const logger = pino({ level: 'debug' });

// user login
const userLogin = async (req, res) => {
    try {
        console.log(req.body)
        const response = await userService.userLogin(req.body)
        if (Array.isArray(response) && response.length > 0) {
            const token = generateToken(response[0], response[0].user_id)
            return res.status(httpStatusCode.OK).send(responseGenerators(response, httpStatusCode.OK, 'User logged in successfully', false, token))
        }
        return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, response, false))
    } catch (error) {
        logger.warn(`Error while loging user. Error: %j %s`, error, error)
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while user login', true))
    }
}

// get movie list by title
const getMoviesListByTitle = async (req, res) => {
    try {
        const movieTitle = req.query.movieTitle;
        const response = await userService.getMoviesListByTitle(movieTitle)
        if(response && response.length <= 0) {
            return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, 'No data exist..!', false))
        }
        return res.status(httpStatusCode.OK).send(responseGenerators(response, httpStatusCode.OK, 'Movies list fetched successfully', false))
    } catch (error) {
        logger.warn(`Error while fetch movies list. Error: %j %s`, error, error)
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while fetch movie list', true))
    }
}


module.exports = {
    userLogin,
    getMoviesListByTitle,
}