const logger = require('pino')({ level: 'debug' });
const jwt = require('jsonwebtoken')

module.exports = {

    pino: require('pino'),
    
    responseGenerators: function (responseData, responseStatusCode, responseStatusMsg, responseErrors, token) {
        const responseJson = {}
        responseJson['data'] = responseData
        responseJson['status_code'] = responseStatusCode
        responseJson['status_message'] = responseStatusMsg
        // errors
        if (responseErrors === undefined) {
            responseJson['response_error'] = []
        } else {
            responseJson['response_error'] = responseErrors
        }       
        // token
        if (token !== undefined) {
            responseJson['token'] = token
        }
        return responseJson
    },

    generateToken: function (user, secretKey) {
        user.date = Date.now
        return jwt.sign({ user: user }, secretKey.toString(), { expiresIn: '2h' })
    }

}
