'use strict';

const { pino } = require('./../lib/utils');
const logger = pino({ level: 'debug' });
const userDataArr = require('./../constants/userData.json')
const axios = require('axios');
let serverUrl = "https://www.omdbapi.com/?i=tt3896198&apikey=425e9e47"

const userLogin = async (reqPayload) => {
    try {
        logger.debug('userLogin() reqPayload: %j', reqPayload)
        const user = userDataArr.filter(item => item.email == reqPayload.email)
        if (user.length === 0) {
            return 'User not exists, Please register !'
        }
        if (reqPayload.password != user[0].password) {
            return 'The password is invalid'
        }
        return user
    }
    catch (error) {
        logger.warn(`Error while userLogin(). Error = %j %s`, error, error)
        throw error
    }
}

const getMoviesListByTitle = async (movieTitle) => {
    try {
        logger.debug('getMoviesListByTitle() movieTitle: %s', movieTitle)
        const response = await fetchMoviesListFromServer(movieTitle)
        console.log(response)
        return response
    } catch (error) {
        logger.warn(`Error while getMoviesListByTitle(). Error = %j %s`, error, error)
        throw error
    }
}

// server call to ombd api for fetching movies list
const fetchMoviesListFromServer = async (movieTitle) => {
    return new Promise(async (resolve, reject) => {
        logger.debug('fetchMoviesListFromServer() movieTitle: %s', movieTitle)
        if (movieTitle) {
            serverUrl = serverUrl + '&t=' + movieTitle
        }
        axios.get(serverUrl).then((result) => {
            resolve(result.data)
        })
            .catch((err) => {
                logger.warn(`Error while fetchMoviesListFromServer(). Error = %j %s`, err, err)
                resolve()
            });
    })
}


module.exports = {
    userLogin,
    getMoviesListByTitle,
}