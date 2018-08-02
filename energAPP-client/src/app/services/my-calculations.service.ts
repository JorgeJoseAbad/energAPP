import { Injectable } from '@angular/core';

@Injectable()

export class MyCalculationsService {

  blockOfData:Object;
  dataForPlot:Object={
    Tiempo: []
  };

  averages={
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

    this.averages.dataPrecio.var=setedDatafromComponent.datosPrecio.shift();
    this.averages.dataCosteEnergia.var=setedDatafromComponent.datosCosteEnergia.shift();
    this.averages.dataPeajeAcceso.var=setedDatafromComponent.datosPeajeAcceso.shift();

    let n:number=setedDatafromComponent.tiempo.length;
    let suma:number=0;

    setedDatafromComponent.datosPrecio.forEach(function(d){

      suma+=Number(d);
    })

    this.averages.dataPrecio.value=suma/n;
    suma=0;


    setedDatafromComponent.datosCosteEnergia.forEach(function(d){
      suma+=Number(d);
    })

    this.averages.dataCosteEnergia.value=suma/n;
    suma=0;

    setedDatafromComponent.datosPeajeAcceso.forEach(function(d){
      suma+=Number(d);
    })

    this.averages.dataPeajeAcceso.value=suma/n;
    suma=0;

    return this.averages;

  }

}
