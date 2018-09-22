import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-my-pvpc',
  templateUrl: './my-pvpc.component.html',
  styleUrls: ['./my-pvpc.component.css']
})
export class MyPVPCComponent implements OnInit {
  @Input() datas;
   myChart:any;

  constructor(private elementRef:ElementRef) { }

  ngOnInit() {
    this.pvpc(this.datas);
  }


  pvpc(data){

    let dia=[];
    let hora=[];
    let diahora=[];
    let gen=['GEN']; //init with label
    let noc=['NOC']; //init with label
    let vhc=['VHC']; //init with label...
    let ccvgen=['CCVGEN'];
    let ccvnoc=['CCVNOC'];
    let ccvvhc=['CCVVHC'];
    let fomgen=['FOMGEN'];
    let fomnoc=['FOMNOC'];
    let fomvhc=['FOMVHC'];
    let fosgen=['FOSGEN'];
    let fosnoc=['FOSNOC'];
    let fosvhc=['FOSVHC'];
    let intgen=['INTGEN'];
    let intnoc=['INTNOC'];
    let intvhc=['INTVHC'];
    let pcapgen=['PCAPGEN'];
    let pcapnoc=['PCAPNOC'];
    let pcapvhc=['PCAPVHC'];
    let pmhgen=['PMHGEN'];
    let pmhnoc=['PMHNOC'];
    let pmhvhc=['PMHVHC'];
    let sahgen=['SAHGEN'];
    let sahnoc=['SAHNOC'];
    let sahvhc=['SAHVHC'];
    let teugen=['TEUGEN'];
    let teunoc=['TEUNOC'];
    let teuvhc=['TEUVHC'];
    let cofgen=['COFGEN'];
    let cofnoc=['COFNOC'];
    let cofvhc=['COFVHC'];


     data.forEach(function(d){
       dia.push(d.Dia);
       hora.push(d.Hora);
       diahora.push(d.Dia+":"+d.Hora);
       gen.push(d.GEN);
       noc.push(d.NOC);
       vhc.push(d.VHC);
       ccvgen.push(d.CCVGEN);
       ccvnoc.push(d.CCVNOC);
       ccvvhc.push(d.CCVVHC);
       fomgen.push(d.FOMGEN);
       fomnoc.push(d.FOMNOC);
       fomvhc.push(d.FOMVHC);
       fosgen.push(d.FOSGEN);
       fosnoc.push(d.FOSNOC);
       fosvhc.push(d.FOSVHC);
       intgen.push(d.INTGEN);
       intnoc.push(d.INTNOC);
       intvhc.push(d.INTVHC);
       pcapgen.push(d.PCAPGEN);
       pcapnoc.push(d.PCAPNOC);
       pcapvhc.push(d.PCAPVHC);
       pmhgen.push(d.PMHGEN);
       pmhnoc.push(d.PMHNOC);
       pmhvhc.push(d.PMHVHC);
       sahgen.push(d.SAHGEN);
       sahnoc.push(d.SAHNOC);
       sahvhc.push(d.SAHVHC);
       teugen.push(d.TEUGEN);
       teunoc.push(d.TEUNOC);
       teuvhc.push(d.TEUVHC);
       cofgen.push(d.COFGEN);
       cofnoc.push(d.COFNOC);
       cofvhc.push(d.COFVHC);
     })
     console.log(diahora);

    this.draw_PVPC(diahora,gen,noc,vhc,ccvgen,ccvnoc,ccvvhc,fomgen,fomnoc,fomvhc
    ,fosgen,fosnoc,fosvhc,intgen,intnoc,intvhc,pcapgen,pcapnoc,pcapvhc
    ,pmhgen,pmhnoc,pmhvhc,sahgen,sahnoc,sahvhc,teugen,teunoc,teuvhc
    ,cofgen,cofnoc,cofvhc);
}

  draw_PVPC(axisX,...axis){

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
            {
              data: axisY[12],
              label: axis[12][0],
              borderColor: "green",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[13],
              label: axis[13][0],
              borderColor: "blue",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[14],
              label: axis[14][0],
              borderColor: "red",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[15],
              label: axis[15][0],
              borderColor: "green",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[16],
              label: axis[16][0],
              borderColor: "blue",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[17],
              label: axis[17][0],
              borderColor: "red",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[18],
              label: axis[18][0],
              borderColor: "green",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[19],
              label: axis[19][0],
              borderColor: "blue",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[20],
              label: axis[20][0],
              borderColor: "red",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[21],
              label: axis[21][0],
              borderColor: "green",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[22],
              label: axis[22][0],
              borderColor: "blue",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[23],
              label: axis[23][0],
              borderColor: "red",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[24],
              label: axis[24][0],
              borderColor: "green",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[25],
              label: axis[25][0],
              borderColor: "blue",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[26],
              label: axis[26][0],
              borderColor: "red",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[27],
              label: axis[27][0],
              borderColor: "green",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[28],
              label: axis[28][0],
              borderColor: "blue",
              fill: false,
              borderWidth: 1
            },
            {
              data: axisY[29],
              label: axis[29][0],
              borderColor: "red",
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
