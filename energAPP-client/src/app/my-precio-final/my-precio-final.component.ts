import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-my-precio-final',
  templateUrl: './my-precio-final.component.html',
  styleUrls: ['./my-precio-final.component.css']
})
export class MyPrecioFinalComponent implements OnInit {

  @Input() datas:any;
   myChart:any;



  constructor(private elementRef:ElementRef) { }

  ngOnInit() {
    this.precioFinal(this.datas);

  }

  precioFinal(data){
    console.log(data);
    let dia=[];
    let hora=[];
    let diahora=[];
    let gen=['GEN']; //init with label
    let noc=['NOC']; //init with label
    let vhc=['VHC']; //init with label...
    let cof=['COF'];
    let boegen=['BOEGEN'];
    let boenoc=['BOENOC'];
    let boevhc=['BOEVHC'];
    let pmhgen=['PMHGEN'];
    let pmhnoc=['PMHNOC'];
    let pmhvhc=['PMHVHC'];
    let sahgen=['SAHGEN'];
    let sahnoc=['SAHNOC'];
    let sahvhc=['SAHVHC'];

     data.forEach(function(d){
       dia.push(d.Dia);
       hora.push(d.Hora);
       diahora.push(d.Dia+":"+d.Hora);
       gen.push(d.GEN);
       noc.push(d.NOC);
       vhc.push(d.VHC);
       cof.push(d.COF);
       boegen.push(d.BOEGEN);
       boenoc.push(d.BOENOC);
       boevhc.push(d.BOEVHC);
       pmhgen.push(d.PMHGEN);
       pmhnoc.push(d.PMHNOC);
       pmhvhc.push(d.PMHVHC);
       sahgen.push(d.SAHGEN);
       sahnoc.push(d.SAHNOC);
       sahvhc.push(d.SAHVHC);

     })

    this.draw_precioFinal(diahora,gen,noc,vhc,cof,boegen,boenoc,boevhc
                  ,pmhgen,pmhnoc,pmhvhc,sahgen,sahnoc,sahvhc);
}

  draw_precioFinal(axisX,...axis){

      let axisY=[];

        for (let j=0;j<axis.length;j++){
          axisY[j]=[];
          axis[j].forEach(function(d){
            axisY[j].push(d.replace(",","."));
          })
          axisY[j].shift();
        }
      axisX.shift();

      let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);

      this.myChart = new Chart(htmlRef, {
        type: 'line',
        data:
         {labels: axisX,
          datasets: [
            {
              data: axisY[0],
              label: axis[0][0],
              borderColor: "blue",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[1],
              label: axis[1][0],
              borderColor: "red",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[2],
              label: axis[2][0],
              borderColor: "green",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[3],
              label: axis[3][0],
              borderColor: "yellow",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[4],
              label: axis[4][0],
              borderColor: "indigo",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[5],
              label: axis[5][0],
              borderColor: "purple",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[6],
              label: axis[6][0],
              borderColor: "pink",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[7],
              label: axis[7][0],
              borderColor: "orange",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[8],
              label: axis[8][0],
              borderColor: "teal",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[9],
              label: axis[9][0],
              borderColor: "cyan",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[10],
              label: axis[10][0],
              borderColor: "grey-dark",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[11],
              label: axis[11][0],
              borderColor: "black",
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
