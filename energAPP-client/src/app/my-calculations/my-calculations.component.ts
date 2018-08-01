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


}
