var express = require('express');
var router = express.Router();

console.log("en index");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',datos:'' });
});

router.post('/',function(req,res,next){
  console.log("he llegado a post");
  console.log(req.body);
});

module.exports = router;
