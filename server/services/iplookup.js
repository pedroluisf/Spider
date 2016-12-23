var Q = require('q');
const dns = require('dns');
var Url = require('url');

var mockData = [
  {
    ip: "0.0.0.0",
    "Belgium": "United States of America",
    "Evere": "Ocean Park",
    "Brussels-Capital": "California",
    "Scarlet-UNI": "Internet Assigned Numbers Authority",
    "unknown": "unknown"
  },
  {
    ip: "1.0.0.0",
    "Belgium": "Australia",
    "Evere": "West End",
    "Brussels-Capital": "Queensland",
    "Scarlet-UNI": "Debogon",
    "unknown": "unknown"
  },
  {
    ip: "1.0.1.0",
    "Belgium": "People's Republic of China",
    "Evere": "斗顶村",
    "Brussels-Capital": "Jin'an District",
    "Scarlet-UNI": "CHINANET-FJ",
    "unknown": "unknown"
  },
  {
    ip: "1.0.4.0",
    "Belgium": "Australia",
    "Evere": "Melbourne",
    "Brussels-Capital": "City of Melbourne",
    "Scarlet-UNI": "BIGRED",
    "unknown": "unknown"
  },
  {
    ip: "1.0.128.0",
    "Belgium": "Thailand",
    "Evere": "Bangkok (Lak Si)",
    "Brussels-Capital": "Lak Si District",
    "Scarlet-UNI": "TOT Public Company Limited",
    "unknown": "unknown"
  },
  {
    ip: "1.21.254.0",
    "Belgium": "Japan",
    "Evere": "Tokyo",
    "Brussels-Capital": "Chiyoda",
    "Scarlet-UNI": "V-FLETS",
    "unknown": "unknown"
  },
  {
    ip: "2c10::",
    "Belgium": "United States of America",
    "Evere": "Manhattan",
    "Brussels-Capital": "New York",
    "Scarlet-UNI": "Internet Assigned Numbers Authority",
    "unknown": "unknown"
  },
  {
    ip: "66.121.234.120",
    "Belgium": "United States of America",
    "Evere": "San Francisco",
    "Brussels-Capital": "California",
    "Scarlet-UNI": "AT&T Internet Services",
    "unknown": "dsl"
  },
  {
    ip: "70.62.10.152",
    "Belgium": "United States of America",
    "Evere": "Floris",
    "Brussels-Capital": "Virginia",
    "Scarlet-UNI": "Time Warner Cable Internet LLC",
    "unknown": "cable"
  },
  {
    ip: "69.229.46.232",
    "Belgium": "United States of America",
    "Evere": "Woodbridge",
    "Brussels-Capital": "California",
    "Scarlet-UNI": "AT&T Internet Services",
    "unknown": "dsl"
  },
  {
    ip: "78.4.77.84",
    "Belgium": "Italy",
    "Evere": "Ardeatino",
    "Brussels-Capital": "Roma Capitale",
    "Scarlet-UNI": "BT Italia (formerly Albacom)",
    "unknown": "unknown"
  },
  {
    ip: "220.241.205.48",
    "Belgium": "People's Republic of China",
    "Evere": "Quarry Bay",
    "Brussels-Capital": "Hong Kong Island",
    "Scarlet-UNI": "KAISA",
    "unknown": "unknown"
  },
  {
    ip: "221.116.80.216",
    "Belgium": "Japan",
    "Evere": "Uchikanda",
    "Brussels-Capital": "Chiyoda",
    "Scarlet-UNI": "usen",
    "unknown": "fttx"
  },
  {
    ip: "5.10.68.16",
    "Belgium": "Afghanistan",
    "Evere": "Kabul",
    "Brussels-Capital": "Kabul",
    "Scarlet-UNI": "SoftLayer",
    "unknown": "unknown"
  },
  {
    ip: "5.10.70.152",
    "Belgium": "Brazil",
    "Evere": "Jatiúca",
    "Brussels-Capital": "Microrregião de Maceió",
    "Scarlet-UNI": "SoftLayer",
    "unknown": "unknown"
  },
  {
    ip: "5.224.226.0",
    "Belgium": "Spain",
    "Evere": "Las Tablas",
    "Brussels-Capital": "Área metropolitana de Madrid y Corredor del Henares",
    "Scarlet-UNI": "VODAFONE-SPAIN-NETWORK",
    "unknown": "unknown"
  },
  {
    ip: "69.178.110.65",
    "Belgium": "United States of America",
    "Evere": "Anchorage",
    "Brussels-Capital": "Alaska",
    "Scarlet-UNI": "GENERAL COMMUNICATION",
    "unknown": "unknown"
  }
];

module.exports = {
  appendIpToPageObject: function(url) {
    var deferred = Q.defer();

    url = Url.parse(url).host;
    dns.lookup(url, function(err, addresses, family) {
      if(!err) {
        deferred.resolve(addresses)
      } else {
        console.error(err);
        deferred.resolve();
      }
    });

    return deferred.promise;
  }
};