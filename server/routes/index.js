var express = require('express');
var router = express.Router();
var page = require('../models/page.js');
var pageobject = require('../models/pageobject.js');

/* GET All Pages */
router.get('/pages', function(req, res, next) {
  page.getAll()
    .then(function(data) {
      res.send(data);
    })
});

/* GET All PageObjects for page */
router.get('/pageobjects/:pageId', function(req, res, next) {
  pageobject.getByPageId(req.params.pageId)
    .then(function(data) {
      res.send(data);
    });
});


module.exports = router;
