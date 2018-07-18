import { Component, OnInit, Input, ElementRef} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyArchivesService} from '../services/my-archives.service';
import { ChartsModule } from 'ng2-charts';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-my-archive-data',
  templateUrl: './my-archive-data.component.html',
  styleUrls: ['./my-archive-data.component.css']
})
export class MyArchiveDataComponent implements OnInit {
 archive:any;
 myChart:any;
 myBarChart:any;
 titleArchive:any;
 dataArchive:any;
 modeFileOne:any=false;
 modeFileTwo:any=false;
 modeFileThree:any=false;
 modeFileFour:any=false;
 modeFilefive:any=false;

  constructor(private route: ActivatedRoute,
              private archivesservice: MyArchivesService,
              private elementRef: ElementRef) { }

  ngOnInit() {
    this.archive=this.archivesservice.getarchivefromservice();
    this.processDataFile(this.archive);
  }

  processDataFile(archive){
    console.log(archive);

    this.titleArchive=Object.keys(archive)[0];
    this.dataArchive=Object.values(Object.values(archive))[0];
    console.log("PARA el iterable ngFOR: ",this.dataArchive);

      switch(this.titleArchive) {
      case "EnergiaAnual":
          this.processAxisData(this.titleArchive,this.dataArchive);
          break;
      case "EnergiaMensual":
          this.processAxisData(this.titleArchive,this.dataArchive);
          break;
      case "EntitledParticipants":
          this.listParticipants(this.titleArchive,this.dataArchive);
          break;
      case "BalanceResponsibleParties":
          this.balanceRespParties(this.titleArchive,this.dataArchive);
          break;
      case "ProgrammingUnits":
          this.programmingUnits(this.titleArchive,this.dataArchive);
          break;
      case "GenerationUnits":
          this.generationUnits(this.titleArchive,this.dataArchive);
          break;
      case "0":
          this.pvpc(this.titleArchive,this.archive);
          break;
      default:
     }

}

  processAxisData(tittle,data){
    this.modeFileOne=1;
    console.log("DATA: ",data);
    console.log("TITTLE: ",tittle);
    let A_Axis=[];
    let B_Axis=[];
    let C_Axis=[];
    let D_Axis=[];
    let ArrayKeys=[];
    let i;

       ArrayKeys=Object.keys(data[0]);    //extract objects keys

      for(i=0;i<data.length;i++){
        A_Axis.push(data[i][ArrayKeys[0]]);
        B_Axis.push(data[i][ArrayKeys[1]]);
        if (ArrayKeys[2]!=undefined) C_Axis.push(data[i][ArrayKeys[2]]);
        if (ArrayKeys[3]!=undefined) D_Axis.push(data[i][ArrayKeys[3]].replace(".","").replace(",","."));
      }

      console.log("ArrayKeys: ",ArrayKeys);
      console.log("A-AXIS: ",ArrayKeys[0],A_Axis);
      console.log("B-AXIS: ",ArrayKeys[1],B_Axis);
      console.log("C-AXIS: ",ArrayKeys[2],C_Axis);
      console.log("D-AXIS: ",ArrayKeys[3],D_Axis);
      this.createChartLine(A_Axis,B_Axis,D_Axis);

}

createChartLine(A_Axis,B_Axis,D_Axis){
   console.log(A_Axis,B_Axis,D_Axis);

  let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);

  this.myChart = new Chart(htmlRef, {
          type: 'line',
          data: {
            labels: A_Axis,
            datasets: [
              {
                data: D_Axis,
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

listParticipants(title,data){
  let listParticipants=[];
  let listEICcodes=[];

  let arrKeys=Object.keys(data[0]);

  data.forEach(function(d) {
      listParticipants.push(d[arrKeys[0]]);
      listEICcodes.push(d[arrKeys[1]]);
  });
  this.modeFileTwo=1;
  console.log(listParticipants,listEICcodes)
}

  balanceRespParties(title,data){
    let BRPcode=[];
    let name=[];
    let EICcode=[];
    let BRPType=[];
    let arrKeys=Object.keys(data[0]);
    data.forEach(function(d) {
      BRPcode.push(d[arrKeys[0]]);
      name.push(d[arrKeys[1]]);
      EICcode.push(d[arrKeys[2]]);
      BRPType.push(d[arrKeys[3]]);
    });
    this.modeFileThree=1;
  }

  programmingUnits(title,data){

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

    let arrKeys=Object.keys(data[0]);

    data.forEach(function(d) {

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
    this.modeFileFour=1;
  }

  generationUnits(title,data){

    let BRPCode=[];
    let Description=[];
    let EICCode=[];
    let MaximumPowerCapacityMW=[];
    let ProductionType=[];
    let UFCode=[];
    let UPCode=[];

    let arrKeys=Object.keys(data[0]);
    console.log(arrKeys);

    data.forEach(function(d) {
      UFCode.push(d[arrKeys[0]]);
      EICCode.push(d[arrKeys[1]]);
      Description.push(d[arrKeys[2]]);
      ProductionType.push(d[arrKeys[3]]);
      BRPCode.push(d[arrKeys[4]]);
      UPCode.push(d[arrKeys[5]]);
      MaximumPowerCapacityMW.push(d[arrKeys[6]]);
    });


    this.modeFilefive=1;
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

pvpc(title,data){
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
  xAxisData1.shift();
  yAxisData1=Object.values(data[0]);
  //let titulo1=yAxisData1.shift();


  xAxisData2=Object.keys(data[1]);
  xAxisData2.shift();
  yAxisData2=Object.values(data[1]);
  //let titulo2=yAxisData2.shift();

  xAxisData3=Object.keys(data[2]);
  xAxisData3.shift();
  yAxisData3=Object.values(data[2]);
  //let titulo3=yAxisData3.shift();


  this.drawPVPC(xAxisData1,yAxisData1,yAxisData2,yAxisData3);



}

drawPVPC(axisX,...axis){
  console.log(axisX,axis[0],axis[1],axis[2]);

  let axisY1=[];
  let axisY2=[];
  let axisY3=[];
  let prov;

  axis[0].forEach(function(d){
    axisY1.push(d.replace(".","").replace(",","."));
  })
  axis[1].forEach(function(d){
    axisY2.push(d.replace(".","").replace(",","."));
  })

  axis[2].forEach(function(d){
    axisY3.push(d.replace(".","").replace(",","."));
  })


let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);

this.myChart = new Chart(htmlRef, {
  type: 'line',
  data:
   {labels: axisX,
    datasets: [
      {
        data: axisY1,
        label: axis[0][0],
        borderColor: "blue",
        fill: false,
        borderWidth: 1
      },

      {
        data: axisY3,
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


}
