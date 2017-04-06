var express = require('express');
var router = express.Router();
var ip = require('ip');

var properties = {};

properties.hostAddress = ip.address();
properties.hostDatetime = new Date();

router.get('/',
  function (req, res, next) {
    res.send(properties);
  }
);

router.post('/', 
  function (req, res, next) {
    var key = req.body.key;
    var value = req.body.value;

    if (key && value) {
      properties[key] = value;
    }

    res.send('ok');
  }
);

module.exports = router;
