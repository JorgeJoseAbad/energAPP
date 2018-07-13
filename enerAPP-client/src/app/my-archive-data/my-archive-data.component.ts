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
dataArchives:any;
keys: any;
 titleArchive:string="no loaded";
 myChart:any;


  constructor(private route: ActivatedRoute,
              private archivesservice: MyArchivesService,
              private elementRef: ElementRef) { }

  ngOnInit() {
    this.archive=this.archivesservice.getarchivefromservice();
    this.titleArchive=Object.keys(this.archive)[0];
    this.dataArchives=Object.values(Object.values(this.archive))[0];
    console.log("PARA el iterable ngFOR: ",this.dataArchives);
    this.processAxisData(this.titleArchive,this.dataArchives);
  }

  ngDoCheck(){

  }

  processAxisData(tittle,data){
    console.log("DATA: ",data);
    console.log("TITTLE: ",tittle);
    let A_Axis=[];
    let B_Axis=[];
    let C_Axis=[];
    let D_Axis=[];
    let ArrayKeys=[];
    let i;

    //extract objects keys
    if(tittle!=0){

       ArrayKeys=Object.keys(data[0]);

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
      this.createChart(A_Axis,B_Axis,D_Axis);
    }
    else console.log("Title = 0");
}

createChart(A_Axis,B_Axis,D_Axis){
   console.log(A_Axis,B_Axis,D_Axis);

  let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);
//let htmlRef = document.getElementById('#canvas');
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
              {
                data: B_Axis,
                borderColor: "#ffcc00",
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

}
