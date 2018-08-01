import { Component, OnInit, Input, ElementRef } from '@angular/core';
import {MyCalculationsService} from '../services/my-calculations.service';
import { ChartsModule } from 'ng2-charts';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-my-calculations',
  templateUrl: './my-calculations.component.html',
  styleUrls: ['./my-calculations.component.css']
})
export class MyCalculationsComponent implements OnInit {

  data:any;
  myChart;

  setedData={
    datosPrecio:[],
    datosCosteEnergia:[],
    datosPeajeAcceso:[],
    tiempo:[]
  }

  mDatosPrecio={
    var:'',
    value:0
  };
  mDatosCosteEnergia={
    var:'',
    value:0
  };
  mDatosPeajeAcceso={
    var:'',
    value:0
  }


  constructor(
    private calculationService: MyCalculationsService,
    private elementRef: ElementRef) { }

  ngOnInit() {
     this.data=this.calculationService.getBlockData();
     this.controlChart(this.data);
  }


controlChart(dataObject){
  console.log("IN CONTROLCHART------->:",dataObject);

   //axis arrays
  let datosTiempo=[];
  let datosPrecio=[];
  let datosCosteEnergia=[];
  let datosPeajeAcceso=[];


  datosPrecio.push('Precio') //for labels array
  dataObject['Precio'].forEach(function(d){
    datosPrecio.push(Object.values(d)[0].replace(",","."));
  })

  datosCosteEnergia.push('Coste Energia')//for labels array
  dataObject["Coste Energia"].forEach(function(d){
    datosCosteEnergia.push(Object.values(d)[0].replace(",","."));
  })

  datosPeajeAcceso.push('Peaje Acceso')//for labels array
  dataObject["Peaje Acceso"].forEach(function(d){
    datosPeajeAcceso.push(Object.values(d)[0].replace(",","."));
  })

  datosTiempo=dataObject['Tiempo'];

  this.setAverages(datosTiempo,datosPrecio,datosCosteEnergia,datosPeajeAcceso);
  this.createChartLine(datosTiempo,datosPrecio,datosCosteEnergia,datosPeajeAcceso)


}

  createChartLine(datosTiempo,...axis){
     console.log(datosTiempo,axis);
     var labels=[]

     axis.forEach(function(d){
       labels.push(d.shift());
     })

    let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);

    this.myChart = new Chart(htmlRef, {
            type: 'line',
            data: {
              labels: datosTiempo,
              datasets: [
                {
                  data: axis[0],
                  label: labels[0],
                  borderColor: "#3CB371",
                  fill: false,
                  borderWidth: 1
                },
                {
                  data: axis[1],
                  label: labels[1],
                  borderColor: "#D2691E",
                  fill: false,
                  borderWidth: 1
                },
                {
                  data: axis[2],
                  label: labels[2],
                  borderColor: "#4169E1",
                  fill: false,
                  borderWidth: 1
                },

              ]
            },
            options: {
              legend: {
                display: true
              },
              scales: {
                xAxes: [{
                  display: true
                }],
                yAxes: [{
                  display: true
                }],
              }
            }
          });
  }


  setAverages(datosTiempo,datosPrecio,datosCosteEnergia,datosPeajeAcceso){

  let t_tiempo=[];
  let t_datosPrecio=[];
  let t_datosCosteEnergia=[];
  let t_datosPeajeAcceso=[];

    datosTiempo.forEach(function(d){
      t_tiempo.push(d)
    })

    datosPrecio.forEach(function(d){
      t_datosPrecio.push(d)
    })

    datosCosteEnergia.forEach(function(d){
      t_datosCosteEnergia.push(d)
    })

    datosPeajeAcceso.forEach(d => {
        t_datosPeajeAcceso.push(d)
    });

    this.setedData.tiempo=t_tiempo;
    this.setedData.datosPrecio=t_datosPrecio;
    this.setedData.datosCosteEnergia=t_datosCosteEnergia;
    this.setedData.datosPeajeAcceso=t_datosPeajeAcceso;


  }

  getAverages(){

    this.mDatosPrecio.var=this.setedData.datosPrecio.shift();
    this.mDatosCosteEnergia.var=this.setedData.datosCosteEnergia.shift();
    this.mDatosPeajeAcceso.var=this.setedData.datosPeajeAcceso.shift();

    let n:number=this.setedData.tiempo.length;
    let suma:number=0;

    this.setedData.datosPrecio.forEach(function(d){

      suma+=Number(d);
    })

    this.mDatosPrecio.value=suma/n;
    suma=0;


    this.setedData.datosCosteEnergia.forEach(function(d){
      suma+=Number(d);
    })

    this.mDatosCosteEnergia.value=suma/n;
    suma=0;

    this.setedData.datosPeajeAcceso.forEach(function(d){
      suma+=Number(d);
    })

    this.mDatosPeajeAcceso.value=suma/n;
    suma=0;

  }

  getAverage(){

  }


}
