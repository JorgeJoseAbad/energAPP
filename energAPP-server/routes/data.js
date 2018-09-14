const express = require('express');
const router = express.Router();
const Valor  =require('../models/valors.model');

console.log("en data");

router.post('/',function(req,res,next){
  console.log("En data post /");

  let myvalors={
      averages:req.body.averages,
      increments:req.body.increments,
      maxmin:req.body.maxmin,
  };

  console.log(myvalors.averages);
  console.log(myvalors.increments);
  console.log(myvalors.maxmin);

  const valor = new Valor({
    averages:myvalors.averages,
    increments:myvalors.increments,
    maxmin:myvalors.maxmin,
  });

  console.log("Este es valor: ",valor);

  valor.save( (err) => {

  });


  res.send(

     "datos recibidos"

  );

});

module.exports = router;
