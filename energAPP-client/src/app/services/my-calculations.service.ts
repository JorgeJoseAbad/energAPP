import { Injectable } from '@angular/core';

@Injectable()

export class MyCalculationsService {

  blockOfData:Object;
  dataForPlot:Object={
    Tiempo: []
  };

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

    let arrayA=[]; //array of objects that share 'indicator'
    let arrayB=[];  //array of objects that share 'indicator'
    let arrayC=[]; //array of objects that share 'indicator'
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

  originalData.forEach(function(d){
    let tempObj={}
    tempObj[Object.keys(d)[1]]=Object.values(d)[1];
    if (d['Indicadores']==listCategorys[0]) {arrayA.unshift(tempObj);
                                             arrayTiempo.unshift(Object.keys(d)[1])
                                           }
    if (d['Indicadores']==listCategorys[1]) arrayB.unshift(tempObj);
    if (d['Indicadores']==listCategorys[2]) arrayC.unshift(tempObj);

  })

  console.log(arrayA,arrayB,arrayC);
  this.dataForPlot[listCategorys[0]]=arrayA;
  this.dataForPlot[listCategorys[1]]=arrayB;
  this.dataForPlot[listCategorys[2]]=arrayC;
  this.dataForPlot['Tiempo']=arrayTiempo;
  console.log(this.dataForPlot);

  }

}
