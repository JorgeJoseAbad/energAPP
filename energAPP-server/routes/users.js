var express = require('express');
var router = express.Router();

/* GET users listing. */
/*route modificada para experimentacion*/
router.get('/', function(req, res, next) {
  console.log("en router get /users");
  console.log(req);
  res.send('respond with a resource');
});

module.exports = router;
