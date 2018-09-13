import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MySendDataService {

  BASE_URL: String = `${environment.baseURL}`;
  options: Object = {withCredentials:true};


  calculatedData={
    averages: Object,
    increments: Object,
    maxmin: Object,
  };

  constructor(private httpclient: HttpClient,
              ) { }

  sendCalculatedDataToBackEnd(averages,increments,maxmin){
    console.log("In service, averages: ",averages);
    console.log("In service, increments: ",increments);
    console.log("In service, maxmin",maxmin);
    this.calculatedData.averages=averages;
    this.calculatedData.increments=increments;
    this.calculatedData.maxmin=maxmin;
    console.log("El objeto queda: ",this.calculatedData);


    return this.httpclient.post(`${this.BASE_URL}/data`,this.calculatedData,{responseType: 'text'});

  }



}
