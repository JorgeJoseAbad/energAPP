var express = require('express');
var router = express.Router();

console.log("en data");

router.post('/',function(req,res,next){
  console.log("En data post /");

  let valors={
      averages:req.body.averages,
      increments:req.body.increments,
      maxmin:req.body.maxmin,
  };

  console.log(valors.averages);
  console.log(valors.increments);
  console.log(valors.maxmin);

  res.send(

     "datos recibidos"

  );

});

module.exports = router;
