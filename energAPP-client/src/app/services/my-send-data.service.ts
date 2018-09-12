import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MySendDataService {

  constructor(private http: HttpClient) { }

  sendCalculatedDataToBackEnd(averages,increments,maxmin){
    console.log("In service, averages: ",averages);
    console.log("In service, increments: ",increments);
    console.log("In service, maxmin",maxmin);
    return true;
  }



}
