var IPLookup = require('../services/iplookup');
var LatLngLookup = require('../services/latlnglookup');
var connection = require('./common.js').connection;
var Q = require('q');
var cache = require('../services/cache');

var appendLatLngToObjects = function(pageObjects) {
  var promiseChain = Q(pageObjects[0]);

  pageObjects.forEach(function(pageObject, index) {

    promiseChain = promiseChain
      .then(function() {
        pageObject.source = {};
      })
      .then(function() {
        if(pageObject.sourceObjectUrl == null) {
          if(pageObjects[index - 1]) {
            pageObject.source.ip = pageObjects[index - 1].destination.ip
          } else {
            pageObject.source.ip = pageObject.clientIp;
          }
          return;
        }

        return IPLookup.appendIpToPageObject(pageObject.sourceObjectUrl)
          .then(function(ip) {
            pageObject.source.ip = ip;
          });
      })
      .then(function() {
        return LatLngLookup.appendLatLngToPageObject(pageObject.source.ip)
          .then(function(latLng) {
            for (var attrname in latLng) { pageObject.source[attrname] = latLng[attrname]; }
          })
      })
      .then(function() {
        pageObject.destination = {};
      })
      .then(function() {
        return IPLookup.appendIpToPageObject(pageObject.url)
          .then(function(ip) {
            pageObject.ip = ip;
          });
      })
      .then(function() {
        return LatLngLookup.appendLatLngToPageObject(pageObject.ip)
          .then(function(destinationNodeInfo) {
            for (var attrname in destinationNodeInfo) {
              pageObject.destination[attrname] = destinationNodeInfo[attrname];
            }

            pageObject.isp = destinationNodeInfo.isp;
          })
      })
      .then(function() {
        return pageObject;
      });
  });

  return promiseChain;
};

module.exports = {
  getByPageId: function(pageId) {
    var deferred = Q.defer();

    var cached = cache.getPageObjectsCache(pageId);
    if(cached === false) {
      connection.query(
        'SELECT PageObject.id AS id, ' +
        ' PageObject.Sequence AS seq, ' +
        ' Url.Url AS url, ' +
        ' MimeType.Description AS fileType, ' +
        ' PageObject.TotalTimeMS AS loadTimeMS, ' +
        ' (CASE ' +
        '   WHEN PageObject.InitiatorPageObjectId IS NOT NULL ' +
        '     THEN SourceUrl.Url' +
        '   WHEN PageObject.InitiatorPageObjectId IS NULL AND PageObject.RefererPageObjectId IS NOT NULL' +
        '     THEN RefererUrl.Url' +
        '   ELSE AgentUrl.Url' +
        ' END) AS sourceObjectUrl, ' +
        ' PageObject.ClientIp AS clientIp ' +
        'FROM PageObject ' +
        'INNER JOIN Url ON Url.id = PageObject.AgentUrlID ' +
        'INNER JOIN MimeType ON MimeType.id = PageObject.MimeTypeID ' +

        'LEFT JOIN PageObject AS SourceObject ON SourceObject.id = PageObject.InitiatorPageObjectId ' +
        'LEFT JOIN PageObject AS RefererObject ON RefererObject.id = PageObject.RefererPageObjectId ' +
        'LEFT JOIN Url AS SourceUrl ON SourceUrl.id = SourceObject.AgentUrlID ' +
        'LEFT JOIN Url AS RefererUrl ON RefererUrl.id = RefererObject.AgentUrlID ' +
        'LEFT JOIN Url AS AgentUrl ON AgentUrl.id = PageObject.AgentUrlID ' +

        'WHERE PageObject.PageID = ' + pageId + ' ' +
        //'WHERE PageObject.PageID = ' + pageId + ' AND PageObject.id IN (10982, 10990, 10996, 10991) ' +
        'ORDER BY PageObject.Sequence ' +
        'LIMIT 25',
        function(err, rows, fields) {
          if (err) throw err;

          return appendLatLngToObjects(rows)
            .then(function() {
              cache.setPageObjectCache(pageId, rows);
              return deferred.resolve(rows);
            });
        }
      );
    } else {
      deferred.resolve(cached);
    }

    return deferred.promise;
  }
};