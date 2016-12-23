var Q = require('q');
var request = require('request');

module.exports = {
  appendLatLngToPageObject: function(ip) {
    var deferred = Q.defer();

    //request.get('http://192.168.100.2:8081/api/IPLookupService?ipAddress=' + ip, function(error, response, body) {
    request.get('https://handlerlb-int-rumstaging.rum.nccgroup-webperf.com:8081/api/IPLookupService?ipAddress=' + ip, function(error, response, body) {
      if (!error) {

        body = JSON.parse(body);

        deferred.resolve({
          country: body.Country,
          state: body.StateProv,
          city: body.City,
          isp: body.IspName,
          lat: body.Latitude,
          lng: body.Longitude
        });
      } else {
        console.error(error);
        deferred.resolve();
      }
    });

    return deferred.promise;
  }
};