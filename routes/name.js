var express = require('express');
var router = express.Router();

var fullName = {
  firstName: "John",
  lastName: "Smith"
};

router.get('/',
  function (req, res, next) {
    res.send(fullName);
  }
);

router.put('/',
  function (req, res, next) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;

    if (firstName) {
      fullName.firstName = firstName;
    }

    if (lastName) {
      fullName.lastName = lastName;
    }

    res.send(fullName);
  }
);

module.exports = router;
