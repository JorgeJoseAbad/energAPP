import { Component, OnInit, Input, ElementRef} from '@angular/core';
import { DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MyArchivesService} from '../services/my-archives.service';
import { MyCalculationsService} from '../services/my-calculations.service';
import { ChartsModule } from 'ng2-charts';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-my-archive-data',
  templateUrl: './my-archive-data.component.html',
  styleUrls: ['./my-archive-data.component.css']
})
export class MyArchiveDataComponent implements OnInit{
 archive:any;
 archiveName:any;
 aditionalData:any;

 myChart:any;
 myBarChart:any;
 keyArchive:any;
 dataArchive:any;
 globalIndex:any=0
 time:any;

 mode_energyAnualMensual:any=false;
 mode_Ind_MaxMinRenovEol:any=false;
 mode_Ind_MaxMin:any=false;
 mode_Ind_DemandaRealGen:any=false;
 mode_Ind_DemandaPrevProg:any=false;
 mode_EntitledParticipants:any=false;
 mode_BalanceResponsibleParties:any=false;
 mode_ProgrammingUnits:any=false;
 mode_GenerationUnits:any=false;
 mode_ParticipantesSubasta:boolean=false;
 mode_SujetosMercado:boolean=false;
 mode_UnidadesProgramacion:boolean=false;
 mode_unidadesFisicas:boolean=false;
 mode_FilePVPC:any=false;
 mode_Ind_Umbrales:any=false;
 mode_Ind_PrecioFinal:any=false;
 mode_Ind_PrecioDesvios:boolean=false;
 mode_Ind_PotInstal:boolean=false;
 mode_Ind_Interconexiones:boolean=false;
 mode_Ind_DemandaInterrumpible:boolean=false;

 mode_dataForCalculations:boolean=false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private archivesservice: MyArchivesService,
              private calculationService: MyCalculationsService,
              private elementRef: ElementRef) { }

  ngOnInit() {
    this.archive=this.archivesservice.getarchivefromservice();
    this.archiveName=this.archivesservice.getNameOfArchive();
    this.aditionalData=this.archivesservice.getAditionalData();
    this.selectFunctionDataFile(this.archive);
  }




  /**
    * Documentation for JSDoc
    * selectFunctionDataFile
    * select JSON data file object key to send value (data) of file to
    * proper function to process.
    * @constructor
    * @param {object} archive - the data file from REE
    */
  selectFunctionDataFile(archive){
    console.log(archive);

    if (archive==undefined) {
      this.router.navigate(['archive-list']);
    }

    this.keyArchive=Object.keys(archive)[0];
    console.log("------->",this.keyArchive);
    this.dataArchive=Object.values(Object.values(archive));

      switch(this.keyArchive) {
      case "EnergiaAnual":
          this.energyAnualMensual(this.keyArchive,this.dataArchive);
          break;
      case "EnergiaMensual":
          this.energyAnualMensual(this.keyArchive,this.dataArchive);
          break;
      case "IND_MaxMinRenovEol":
          this.ind_MaxMinRenovEol(this.keyArchive,this.dataArchive);
          break;
      case "IND_MaxMin":
          this.ind_MaxMin(this.keyArchive,this.dataArchive);
          break;
      case "IND_DemandaRealGen":
          this.ind_DemandaRealGen(this.keyArchive,this.dataArchive);
          break;
      case "IND_DemandaPrevProg":
          this.ind_DemandaPrevProg(this.keyArchive,this.dataArchive);
          break;
      case "EntitledParticipants":
          this.entitledParticipants(this.keyArchive,this.dataArchive);
          break;
      case "BalanceResponsibleParties":
          this.balanceResponsibleParties(this.keyArchive,this.dataArchive);
          break;
      case "ProgrammingUnits":
          this.programmingUnits(this.keyArchive,this.dataArchive);
          break;
      case "GenerationUnits":
          this.generationUnits(this.keyArchive,this.dataArchive);
          break;
      case "ParticipantesSubasta":
          this.participantesSubasta(this.keyArchive,this.dataArchive);
          break;
      case "SujetosMercado":
          this.sujetosMercado(this.keyArchive,this.dataArchive);
          break;
      case "UnidadesProgramacion":
          this.unidadesProgramacion(this.keyArchive,this.dataArchive);
          break;
      case "UnidadesFisicas":
          this.unidadesFisicas(this.keyArchive,this.dataArchive);
          break;
      case "0":
          this.zero_pvpc(this.keyArchive,this.dataArchive);
          break;
      case "PVPC":
          this.pvpc(this.keyArchive,this.dataArchive);
          break;
      case "Umbrales":
          this.umbrales(this.keyArchive,this.archive);
          break;
      case "PrecioFinal":
          this.precioFinal(this.keyArchive,this.archive);
          break;
      case "PrecioDesvíos":
          this.precioDesvíos(this.keyArchive,this.dataArchive);
          break;
      case "PotInstal":
          this.potInstal(this.keyArchive,this.dataArchive);
          break;
      case "Interconexiones":
          this.interconexiones(this.keyArchive,this.dataArchive);
          break;
      case "DemandaInterrumpible":
          this.demandaInterrumpible(this.keyArchive,this.dataArchive);
          break;
      case "data":
          this.dataForCalculations(this.keyArchive,this.dataArchive);
          break;
      default:
     }

}

  energyAnualMensual(tittle,data){

    console.log("DATA: ",data);
    console.log("TITTLE: ",tittle);
    let arrayData=data[0]; //arrayData is the real data inside data array from Object.values
    let A_Axis=[];
    let B_Axis=[];
    let C_Axis=[];
    let D_Axis=[];
    let arrayKeys=[];
    let i;

       arrayKeys=Object.keys(arrayData[0]);    //extract objects keys

      for(i=0;i<arrayData.length;i++){
        A_Axis.push(arrayData[i][arrayKeys[0]]);
        B_Axis.push(arrayData[i][arrayKeys[1]]);
        if (arrayKeys[2]!=undefined) C_Axis.push(arrayData[i][arrayKeys[2]]);
        if (arrayKeys[3]!=undefined) D_Axis.push(arrayData[i][arrayKeys[3]].replace(".","").replace(",","."));
      }

      console.log("ArrayKeys: ",arrayKeys);
      console.log("A-AXIS: ",arrayKeys[0],A_Axis);
      console.log("B-AXIS: ",arrayKeys[1],B_Axis);
      console.log("C-AXIS: ",arrayKeys[2],C_Axis);
      console.log("D-AXIS: ",arrayKeys[3],D_Axis);
      this.dataArchive=arrayData;
      this.createChartLine(A_Axis,D_Axis);
      this.mode_energyAnualMensual=1;

}

createChartLine(...axis){
   console.log(axis);

  let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);

  this.myChart = new Chart(htmlRef, {
          type: 'line',
          data: {
            labels: axis[0],
            datasets: [
              {
                data: axis[1],
                borderColor: "#3cba9f",
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: false
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

ind_MaxMinRenovEol(title,data){
  console.log("IN INDEFINED TITLE",title,data);
  let arr=[];
  arr.push(data[0]);
  this.dataArchive=arr;
  console.log(arr);
  this.mode_Ind_MaxMinRenovEol=true;
}

ind_MaxMin(title,data){
  console.log(title,data);
  let arr=[];
  arr.push(data[0]);
  this.dataArchive=arr;
  this.mode_Ind_MaxMin=true;
}

ind_DemandaRealGen(title,data){
  console.log(data);
  console.log(data[0].valoresHorariosGeneracion)
  let object:any;

  object=data[0].valoresHorariosGeneracion;
  //object=Object.values(data["IND_DemandaRealGen"]);
  console.log(object);

  this.dataArchive=object;
  //this.createPieChart_DemandaRealGen(object);
  this.createStakedChart_DemandaRealGen(object);
  this.mode_Ind_DemandaRealGen=true;
}

newData(){
  this.globalIndex++;
  this.createPieChart_DemandaRealGen(this.dataArchive);
  console.log(this.globalIndex,this.myChart.data.labels);
  this.myChart.update();
}

createPieChart_DemandaRealGen(...axis){

  console.log(axis);

  let axisA=axis["0"];
  console.log("AxisA-----> leng",axisA.length);
  console.log(this.globalIndex);
  let labels=Object.keys(axisA[this.globalIndex]);
  let datas=Object.values(axisA[this.globalIndex]);

  let dateLabel=labels.shift();
  let date=datas.shift();
  this.time=date;

  console.log(labels,datas);

 let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);

 this.myChart = new Chart(htmlRef, {
         type: 'pie',

         data: {
           labels: labels,
           datasets: [
             {
               data: datas,
               borderColor: "#3cba9f",
               backgroundColor: ["#ffaa00","#bbaa00","#11aa00","#ffcc00","#33aaff",
                  "#aaaa00","#ee4400","#cc7711","#dd0055","#111100","#66aaff",
                "#333333","#555555","#222222","#aa44aa"],
               fill: false
             },
           ]
         }, //data

         options: {
           legend: {
             display: true
           },
           scales: {
             xAxes: [{
               display: false
             }],
             yAxes: [{
               display: false
             }],
           }
         } //options

       });


}

/* stacked chart */
createStakedChart_DemandaRealGen(...axis){

  console.log("axis--------------->",axis);

  let axisA=axis["0"];
  console.log("AxisA-----> ",axisA);
  let timeline=[];

  let aut=[];
  let car=[];
  let cc=[];
  let cogenResto=[];
  let dem=[];
  let eol=[];
  let gf=[];
  let hid=[];
  let icb=[];
  let inter=[];
  let nuc=[];
  let sol=[];
  let solFot=[];
  let solTer=[];
  let termRenov=[];

  let labels=Object.keys(axisA[0]);

  axisA.forEach(function(d){
    timeline.push(d.ts)
    aut.push(d.aut)
    car.push(d.car)
    cc.push(d.cc)
    cogenResto.push(d.cogenResto)
    dem.push(d.dem)
    eol.push(d.eol);
    gf.push(d.gf);
    hid.push(d.hid);
    icb.push(d.icb);
    inter.push(d.inter);
    nuc.push(d.nuc);
    sol.push(d.sol);
    solFot.push(d.solFot);
    solTer.push(d.solTer);
    termRenov.push(d.termRenov);
  })

console.log(timeline);

 let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);

 this.myChart = new Chart(htmlRef, {
         type: 'line',

         data: {
           labels: timeline,
           datasets: [
             {
               label: 'aut',
               data: aut,
               borderColor: "#3cba9f",
               backgroundColor: ["#ffaa00"],
               pointRadius: 0,
               fill: true
             },
             {
               label: 'car',
               data: car,
               borderColor: "#3cba9f",
               backgroundColor: ["#aaee66"],
               pointRadius: 0,
               fill: true
             },
             {
               label: 'cc',
               data: cc,
               borderColor: "#3cba9f",
               backgroundColor: ["#234"],
               pointRadius: 0,
               fill: true
             },
             {
               label: 'cogenResto',
               data: cogenResto,
               borderColor: "#3cba9f",
               backgroundColor: ["#564"],
               pointRadius: 0,
               fill: true
             },
             {
               label: 'dem',
               data: dem,
               borderColor: "#3cba9f",
               backgroundColor: ["#282"],
               pointRadius: 0,
               fill: true
             },
             {
               label: 'eol',
               data: eol,
               borderColor: "#3cba9f",
               backgroundColor: ["#736"],
               pointRadius: 0,
               fill: true
             },
             {
               label: 'gf',
               data: gf,
               borderColor: "#3cba9f",
               backgroundColor: ["#345"],
               pointRadius: 0,
               fill: true
             },
             {
               label: 'hid',
               data: hid,
               borderColor: "#3cba9f",
               backgroundColor: ["#f1e"],
               pointRadius: 0,
               fill: true
             },
             {
               label: 'icb',
               data: icb,
               borderColor: "#3cba9f",
               backgroundColor: ["#23c"],
               pointRadius: 0,
               fill: true
             },
             {
               label: 'inter',
               data: inter,
               borderColor: "#3cba9f",
               backgroundColor: ["#ccc"],
               pointRadius: 0,
               fill: true
             },
             {
               label: 'nuc',
               data: nuc,
               borderColor: "#3cba9f",
               backgroundColor: ["#aae"],
               pointRadius: 0,
               fill: true
             },
             {
               label: 'sol',
               data: sol,
               borderColor: "#3cba9f",
               backgroundColor: ["#bbb"],
               pointRadius: 0,
               fill: true
             },
             {
               label: 'solFot',
               data: solFot,
               borderColor: "#3cba9f",
               backgroundColor: ["#2f3"],
               pointRadius: 0,
               fill: true
             },
             {
               label: 'solTer',
               data: solTer,
               borderColor: "#3cba9f",
               backgroundColor: ["#3af"],
               pointRadius: 0,
               fill: true
             },
             {
               label: 'termRenov',
               data: termRenov,
               borderColor: "#3cba9f",
               backgroundColor: ["#777"],
               pointRadius: 0,
               fill: true
             },
           ]
         }, //data

         options: {
           legend: {
             display: true
           },
           scales: {
             xAxes: [{
               display: true
             }],
             yAxes: [{
               display: true,
               stacked: true
             }],
           }
         } //options

       });


}


ind_DemandaPrevProg(title,data){
  console.log(data);

  this.dataArchive=data[0].valoresPrevistaProgramada;
  let object:any;
  object=data[0].valoresPrevistaProgramada;
  this.createPieChart_DemandaRealGen(object);
  this.mode_Ind_DemandaPrevProg=true;
}


entitledParticipants(title,data){
  let listParticipants=[];
  let listEICcodes=[];
  let arrayData=data[0];
  let arrKeys=Object.keys(arrayData[0]);

  arrayData.forEach(function(d) {
      listParticipants.push(d[arrKeys[0]]);
      listEICcodes.push(d[arrKeys[1]]);
  });
  this.dataArchive=arrayData;
  this.mode_EntitledParticipants=1;
  console.log(listParticipants,listEICcodes)
}

  balanceResponsibleParties(title,data){
    let BRPcode=[];
    let name=[];
    let EICcode=[];
    let BRPType=[];
    let arrayData=data[0]
    let arrKeys=Object.keys(arrayData[0]);
    arrayData.forEach(function(d) {
      BRPcode.push(d[arrKeys[0]]);
      name.push(d[arrKeys[1]]);
      EICcode.push(d[arrKeys[2]]);
      BRPType.push(d[arrKeys[3]]);
    });
    this.dataArchive=arrayData;
    this.mode_BalanceResponsibleParties=1;
  }

  programmingUnits(title,data){

    let arrayData=data[0];

    let BRPCode=[];
    let EICCode=[];
    let LargeDescription=[];
    let MaximumPowerCapacity=[];
    let ProductionType=[];
    let RegulationZone=[];
    let Scope=[];
    let ShortDescription=[];
    let Trade=[];
    let UPCode=[];
    let UPType=[];


    let arrKeys=Object.keys(arrayData[0]);

    arrayData.forEach(function(d) {

      BRPCode.push(d[arrKeys[0]]);
      EICCode.push(d[arrKeys[1]]);
      LargeDescription.push(d[arrKeys[2]]);
      MaximumPowerCapacity.push(d[arrKeys[3]]);
      ProductionType.push(d[arrKeys[4]]);
      RegulationZone.push(d[arrKeys[5]]);
      Scope.push(d[arrKeys[6]]);
      ShortDescription.push(d[arrKeys[7]]);
      Trade.push(d[arrKeys[8]]);
      UPCode.push(d[arrKeys[9]]);
      UPType.push(d[arrKeys[10]]);

    });
    this.dataArchive=arrayData;
    this.mode_ProgrammingUnits=1;
  }

  generationUnits(title,data){

    let arrayData=data[0];

    let BRPCode=[];
    let Description=[];
    let EICCode=[];
    let MaximumPowerCapacityMW=[];
    let ProductionType=[];
    let UFCode=[];
    let UPCode=[];

    let arrKeys=Object.keys(arrayData[0]);
    console.log(arrKeys);

    arrayData.forEach(function(d) {
      UFCode.push(d[arrKeys[0]]);
      EICCode.push(d[arrKeys[1]]);
      Description.push(d[arrKeys[2]]);
      ProductionType.push(d[arrKeys[3]]);
      BRPCode.push(d[arrKeys[4]]);
      UPCode.push(d[arrKeys[5]]);
      MaximumPowerCapacityMW.push(d[arrKeys[6]]);
    });


    this.mode_GenerationUnits=1;
    this.drawGenerationUnits(ProductionType,Description,MaximumPowerCapacityMW);
  }

  /*provisional name of function*/
  drawGenerationUnits(ProductionType,Description,MaximumPowerCapacityMW){
    let power=[];
    let prov;

    MaximumPowerCapacityMW.forEach(function(d){

      prov=d.replace(".","").replace(",",".");
      //only to avoid a extreme value
      if (prov=="999999.9") {
                          prov="100";
                          power.push(prov)}
      else power.push(prov);

    })


  console.log(Description,MaximumPowerCapacityMW,power);

  let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);

  this.myChart = new Chart(htmlRef, {
    type: 'line',
    data:
     {labels: Description,
      datasets: [
        {
          data: power,
          borderColor: "#ffcc00",
          fill: true,
          borderWidth: 1
        },
      ]
    },
    options: {
      legend: {
        display: false
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

participantesSubasta(title,data){
  let arrData=data[0];
  this.dataArchive=arrData;
  this.mode_ParticipantesSubasta=true;
}

sujetosMercado(title,data){
  let arrData=data[0];
  this.dataArchive=arrData;
  this.mode_SujetosMercado=true;
}

unidadesProgramacion(title,data){
  let arrData=data[0];
  this.dataArchive=arrData;
  this.mode_UnidadesProgramacion=true
}

unidadesFisicas(title,data){
  let arrData=data[0];
  this.dataArchive=arrData;
  this.mode_unidadesFisicas=true;
}

zero_pvpc(title,data){
  console.log("In PVPC",title,data);
  let titulos=[];
  let xAxisData1=[];
  let yAxisData1=[];
  let xAxisData2=[];
  let yAxisData2=[];
  let xAxisData3=[];
  let yAxisData3=[];
  for (let i=0;i<data.length;i++){
    titulos[i]=Object.values(data[i])[0];

  }

  xAxisData1=Object.keys(data[0]);
  //xAxisData1.shift();
  yAxisData1=Object.values(data[0]);
  //let titulo1=yAxisData1.shift();

  xAxisData2=Object.keys(data[1]);
  //xAxisData2.shift();
  yAxisData2=Object.values(data[1]);
  //let titulo2=yAxisData2.shift();

  xAxisData3=Object.keys(data[2]);
  //xAxisData3.shift();
  yAxisData3=Object.values(data[2]);
  //let titulo3=yAxisData3.shift();

  this.drawPVPC(xAxisData1,yAxisData1,yAxisData2,yAxisData3);

}

pvpc(title,data){
  console.log("IN PVPC-B",title,data)
  console.log(typeof(data));
  let dia=[];
  let hora=[];
  let gen=[];
  let noc=[];
  let vhc=[];

  this.dataArchive=data[0];
  this.mode_FilePVPC=true;
}

drawPVPC(axisX,...axis){

    let axisY=[];


      let axisY1=[];
      let axisY2=[];
      let axisY3=[];
      let prov;

      for (let j=0;j<axis.length;j++){
        axisY[j]=[];
        axis[j].forEach(function(d){
          axisY[j].push(d.replace(".","").replace(",","."));
        })
        axisY[j].shift();
      }
    axisX.shift();

    console.log(axisX,axisY);

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

 umbrales(title,data){
   console.log(title,data);
   //let arrKeys=[];
   let arrValues=[];
   let arrUMB=[];
   let arrVAL=[];
   let arrData=[];

   //arrKeys=Object.keys(data["Umbrales"]);
   arrValues=Object.values(data["Umbrales"]);
   console.log(arrValues);
   arrValues.forEach(function(d,i){
     arrData[i]=[];
     arrData[i].push(d["UMB"]);
     arrData[i].push(d["VAL"]);
   })
   console.log(arrData);
   this.dataArchive=arrData;
   this.mode_Ind_Umbrales=true;

 }

precioFinal(title,data){
  this.dataArchive=data.PrecioFinal;
  this.mode_Ind_PrecioFinal=true;
}

precioDesvíos(title,data){
  console.log(data);
  this.dataArchive=data;
  this.mode_Ind_PrecioDesvios=true;
}

potInstal(title,data){
  this.dataArchive=data;
  this.mode_Ind_PotInstal=true;
}

interconexiones(title,data){
  this.dataArchive=data;
  this.mode_Ind_Interconexiones=true;
}

demandaInterrumpible(title,data){
  this.dataArchive=data;
  this.mode_Ind_DemandaInterrumpible=true;
}

dataForCalculations(title,data){

  this.dataArchive=data["0"].archive_values;
  this.mode_dataForCalculations=true;
  this.calculationService.saveBlockData(this.dataArchive);

}

}
