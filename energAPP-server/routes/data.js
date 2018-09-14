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

  console.log(myvalors.archivename);
  console.log(myvalors.averages);
  console.log(myvalors.increments);
  console.log(myvalors.maxmin);

  const valor = new Valor({
    archivename:myvalors.archivename,
    averages:myvalors.averages,
    increments:myvalors.increments,
    maxmin:myvalors.maxmin,
  });

  console.log("Este es valor: ",valor);

  valor.save( (err) => {

  });


  res.send(

     valor.archivename

  );

});

module.exports = router;
