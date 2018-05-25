'use strict';
module.exports = function(app) {
  var EList = require('../controllers/ENSLogController');

  // Routes
  app.route('/ensevents')
    .get(EList.listLogs)
    .post(EList.createLog);

  app.route('/ensevents/:eventId')
    .get(EList.readLog);
};