const express = require('express');
const router = express.Router();
const Valor  =require('../models/valors.model');

console.log("en data");

router.post('/',function(req,res,next){
  console.log("En data post /");

  let myvalors={
      archivename:req.body.archivename,
      averages:req.body.averages,
      increments:req.body.increments,
      maxmin:req.body.maxmin,
  };

  const valor = new Valor({
    archivename:myvalors.archivename,
    averages:myvalors.averages,
    increments:myvalors.increments,
    maxmin:myvalors.maxmin,
  });

  valor.save( (err) => {

    if (err) { return next(err); }
     return res.send(
        valor.archivename
     );

  });


});

module.exports = router;
