const usersRoute = require('./user');

module.exports = function(app) {
  app.use('/api', usersRoute)
}
