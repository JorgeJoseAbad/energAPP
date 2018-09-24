import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-my-precio-desvios',
  templateUrl: './my-precio-desvios.component.html',
  styleUrls: ['./my-precio-desvios.component.css']
})
export class MyPrecioDesviosComponent implements OnInit {
  @Input() datas;

  constructor() { }

  ngOnInit() {
  
    this.preciodesvios(this.datas);
  }

  preciodesvios(data){
    console.log(Object.keys(data));
    console.log("in this moment data are not implemented by REE");
  }

/*
  draw_zero_PVPC(axisX,...axis){

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
*/

}
