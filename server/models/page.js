var connection = require('./common.js').connection;
var cache = require('../services/cache');

var Q = require('q');

module.exports = {
  getAll: function() {
    var deferred = Q.defer();

    var cached = cache.getPagesCache();
    if(cached === false) {
      connection.query(
        'SELECT id, Title ' +
        'FROM Page ' +
        'GROUP BY(Title) ' +
        'ORDER BY id DESC ' +
        'LIMIT 3',
        function(err, rows, fields) {
          if (err) throw err;
          cache.setPagesCache(rows);
          deferred.resolve(rows);
        }
      );
    } else {
      deferred.resolve(cached);
    }

    return deferred.promise;
  }
};