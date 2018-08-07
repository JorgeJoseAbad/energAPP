import { Injectable } from '@angular/core';

@Injectable()

export class MyCalculationsService {

  blockOfData:Object;
  dataForPlot:Object={
    Tiempo: []
  };

  averages={
    interval:{
      start:0,
      end:0,
    },
    dataPrecio:{
      var:'',
      value:0
    },
    dataCosteEnergia:{
      var:'',
      value:0
    },
    dataPeajeAcceso:{
      var:'',
      value:0
    }
  }

  increments={
    interval:{
      start:0,
      end:0,
    },
    dataPrecio:{
      var:'',
      value:0
    },
    dataCosteEnergia:{
      var:'',
      value:0
    },
    dataPeajeAcceso:{
      var:'',
      value:0
    }
  }

  maxmins={

    interval:{
      start:0,
      end:0,
    },
    dataPrecio:{
      var:'',
      max:{
        value:0,
        time:0,
      },
      min:{
        value:0,
        time:0,
      }
    },
    dataCosteEnergia:{
      var:'',
      max:{
        value:0,
        time:0
      },
      min:{
        value:0,
        time:0,
      }
    },
    dataPeajeAcceso:{
      var:'',
      max:{
        value:0,
        time:0,
      },
      min:{
        value:0,
        time:0,
      }
    }
  }


  constructor() { }

  saveBlockData(block){
    //block is an array of objects
    this.reorderData(block);
    this.blockOfData=block;



  }

  getBlockData(){
    return this.dataForPlot;
  }

  reorderData(originalData){
    //originalData is an array of objects
    let listCategorys=[];

    let arrayA=[]; //array of objects that share 'indicator value'
    let arrayB=[];  //array of objects that share 'indicator value'
    let arrayC=[]; //array of objects that share 'indicator value'
    let arrayTiempo=[];

    originalData.forEach(function(d){
      let temp;
      let existe:boolean=false;
      temp=(Object.values(d)[0]);
      listCategorys.forEach(function(d){
        if (d==temp) existe=true;

      })
      if (existe==false) listCategorys.push(temp);

    });

    console.log("Original data: ------>",originalData);
    console.log("list Categorys:------->",listCategorys);


  //unshift() to order time and its values. Arrays of data (only value),
  // from arrays of objects (key - value pairs).
  originalData.forEach(function(d){
    let tempObj={}
    tempObj[Object.keys(d)[1]]=Object.values(d)[1];
    if (d['Indicadores']==listCategorys[0]) {
                                             arrayA.unshift(tempObj);
                                             arrayTiempo.unshift(Object.keys(d)[1])
                                           }
    if (d['Indicadores']==listCategorys[1]) arrayB.unshift(tempObj);
    if (d['Indicadores']==listCategorys[2]) arrayC.unshift(tempObj);

  })

  console.log(arrayA,arrayB,arrayC);

  //object with ordered arrays of time and data.
  this.dataForPlot[listCategorys[0]]=arrayA;
  this.dataForPlot[listCategorys[1]]=arrayB;
  this.dataForPlot[listCategorys[2]]=arrayC;
  this.dataForPlot['Tiempo']=arrayTiempo;
  console.log(this.dataForPlot);

  }


  getAverages(setedDatafromComponent){

    // important, setedDatafromComponent is a object.
    // Is pased by REFERENCE
    // needed a intermediate object

      let mydatosPrecio=[];
      let mydatosCosteEnergia=[];
      let mydatosPeajeAcceso=[];
      let mytiempo=[];

      setedDatafromComponent.datosPrecio.forEach(function(d){
        mydatosPrecio.push(d)
      })

      setedDatafromComponent.datosCosteEnergia.forEach(function(d){
        mydatosCosteEnergia.push(d)
      })

      setedDatafromComponent.datosPeajeAcceso.forEach(function(d){
         mydatosPeajeAcceso.push(d)
      })

      setedDatafromComponent.tiempo.forEach(function(d){
         mytiempo.push(d)
       })

    console.log("EN GET AVERAGES: ",setedDatafromComponent);

    this.averages.dataPrecio.var=mydatosPrecio.shift();
    this.averages.dataCosteEnergia.var=mydatosCosteEnergia.shift();
    this.averages.dataPeajeAcceso.var=mydatosPeajeAcceso.shift();

    let n:number=setedDatafromComponent.tiempo.length;

    this.averages.interval.start=mytiempo[0];
    this.averages.interval.end=mytiempo[mytiempo.length-1]
    let suma:number=0;

    mydatosPrecio.forEach(function(d){

      suma+=Number(d);
    })

    this.averages.dataPrecio.value=suma/n;
    suma=0;


    mydatosCosteEnergia.forEach(function(d){
      suma+=Number(d);
    })

    this.averages.dataCosteEnergia.value=suma/n;
    suma=0;

    mydatosPeajeAcceso.forEach(function(d){
      suma+=Number(d);
    })

    this.averages.dataPeajeAcceso.value=suma/n;
    suma=0;

    return this.averages;

  }

  getIncrements(setedDatafromComponent){

    // important, setedDatafromComponent is a object.
    // Is pased by REFERENCE
    // needed a intermediate object

    let mydatosPrecio=[];
    let mydatosCosteEnergia=[];
    let mydatosPeajeAcceso=[];
    let mytiempo=[];

    setedDatafromComponent.datosPrecio.forEach(function(d){
      mydatosPrecio.push(d)
    })

    setedDatafromComponent.datosCosteEnergia.forEach(function(d){
      mydatosCosteEnergia.push(d)
    })

    setedDatafromComponent.datosPeajeAcceso.forEach(function(d){
       mydatosPeajeAcceso.push(d)
    })

    setedDatafromComponent.tiempo.forEach(function(d){
       mytiempo.push(d)
     })

    console.log("EN GET INCREMENTS: ",setedDatafromComponent);

    this.increments.dataPrecio.var=mydatosPrecio.shift();
    this.increments.dataCosteEnergia.var=mydatosCosteEnergia.shift();
    this.increments.dataPeajeAcceso.var=mydatosPeajeAcceso.shift();

    this.increments.interval.start=mytiempo[0];
    this.increments.interval.end=mytiempo[mytiempo.length-1]

    this.increments.dataPrecio.value
      =mydatosPrecio[mydatosPrecio.length-1]
      -mydatosPrecio[0];

    this.increments.dataCosteEnergia.value
      =mydatosCosteEnergia[mydatosCosteEnergia.length-1]
      -mydatosCosteEnergia[0];

    this.increments.dataPeajeAcceso.value
      =mydatosPeajeAcceso[mydatosPeajeAcceso.length-1]
      -mydatosPeajeAcceso[0];

    return this.increments;
}

getMaxMin(setedDatafromComponent){

  console.log(setedDatafromComponent);

  let mydatosPrecio=[];
  let mydatosCosteEnergia=[];
  let mydatosPeajeAcceso=[];
  let mytiempo=[];

  let index;
  let tiempoRef;

  function valueForIndex(element){
    return element==this; // "==" compare string with number
  }


  setedDatafromComponent.datosPrecio.forEach(function(d){
    mydatosPrecio.push(d)
  })

  setedDatafromComponent.datosCosteEnergia.forEach(function(d){
    mydatosCosteEnergia.push(d)
  })

  setedDatafromComponent.datosPeajeAcceso.forEach(function(d){
     mydatosPeajeAcceso.push(d)
  })

  setedDatafromComponent.tiempo.forEach(function(d){
     mytiempo.push(d)
   })

   this.maxmins.dataPrecio.var=mydatosPrecio.shift();
   this.maxmins.dataCosteEnergia.var=mydatosCosteEnergia.shift();
   this.maxmins.dataPeajeAcceso.var=mydatosPeajeAcceso.shift();

   this.maxmins.interval.start=mytiempo[0];
   this.maxmins.interval.end=mytiempo[mytiempo.length-1]

   /*find time of max mins */
   this.maxmins.dataPrecio.max.value=Math.max(...mydatosPrecio);
   index=mydatosPrecio.findIndex(valueForIndex,this.maxmins.dataPrecio.max.value);
   tiempoRef=mytiempo[index];
   this.maxmins.dataPrecio.max.time=tiempoRef;

   this.maxmins.dataCosteEnergia.max.value=Math.max(...mydatosCosteEnergia);
   index=mydatosCosteEnergia.findIndex(valueForIndex,this.maxmins.dataCosteEnergia.max.value);
   tiempoRef=mytiempo[index];
   this.maxmins.dataCosteEnergia.max.time=tiempoRef;

   this.maxmins.dataPeajeAcceso.max.value=Math.max(...mydatosPeajeAcceso);
   index=mydatosPeajeAcceso.findIndex(valueForIndex,this.maxmins.dataPeajeAcceso.max.value);
   tiempoRef=mytiempo[index]
   this.maxmins.dataPeajeAcceso.max.time=tiempoRef;


   this.maxmins.dataPrecio.min.value=Math.min(...mydatosPrecio);
   index=mydatosPrecio.findIndex(valueForIndex,this.maxmins.dataPrecio.min.value);
   tiempoRef=mytiempo[index];
   this.maxmins.dataPrecio.min.time=tiempoRef;

   this.maxmins.dataCosteEnergia.min.value=Math.min(...mydatosCosteEnergia);
   index=mydatosCosteEnergia.findIndex(valueForIndex,this.maxmins.dataCosteEnergia.min.value);
   tiempoRef=mytiempo[index];
   this.maxmins.dataCosteEnergia.min.time=tiempoRef;

   this.maxmins.dataPeajeAcceso.min.value=Math.min(...mydatosPeajeAcceso);
   index=mydatosPeajeAcceso.findIndex(valueForIndex,this.maxmins.dataPeajeAcceso.min.value);
   tiempoRef=mytiempo[index];
   this.maxmins.dataPeajeAcceso.min.time=tiempoRef;

   return this.maxmins;

}

}
