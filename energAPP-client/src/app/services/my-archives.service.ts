import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()

export class MyArchivesService {

 private httpOptions = {
  headers: new HttpHeaders({
    'Accept':'application/json; application/vnd.esios-api-v1+json',
    'Content-Type':'text',
    'Authorization':'Token token="65ea46a74c7372e0776cbe0a216543288fb804d6e0b5c2603c0bae449b39c824"',
  })
};

private httpParams={
  params: new HttpParams().set('responseType', "Text")
}

keepedFile:any; //data from original file
archiveName:any; //name original file, ej PVPC_VHC_P1 -->posible change to description
aditionalData:any; // Data betwen dates etc

constructor(
  private http: HttpClient,
) { }

  getarchiveslist(archives_json_url):Observable<Object>{
    console.log("llegamos a pedir lista ",archives_json_url);
    return this.http.get(archives_json_url,this.httpOptions)
  }

  getarchiveslistfiltered(archives_json_url,taxonomyTerm):Observable<Object>{

    const httpOptions = {
     headers: new HttpHeaders({
       'Accept':'application/json; application/vnd.esios-api-v1+json',
       'Content-Type':'application/json',
       'Authorization':'Token token="65ea46a74c7372e0776cbe0a216543288fb804d6e0b5c2603c0bae449b39c824"',
     }),
     params: new HttpParams().set('taxonomy_terms',taxonomyTerm)
    };

    return this.http.get(archives_json_url,httpOptions)
  }


  getarchivePreview(full_url_archive):Observable<Object>{
    let archive= this.http.get(full_url_archive,this.httpOptions);
    return archive;
  }

  getarchive(full_url_archive):Observable<Object>{
    let archive= this.http.get(full_url_archive,{responseType:'text'});
    return archive;
  }

  /**
    * keeparchiveinservice
    * Process text file downloaded from REE,
    * replace wrong chars to parse text to JSON.
    * and save file in JSON format
    * documentation for JSDoc
    * @constructor
    * @param {text} archive - the data file from REE, text format
    * @return {object} keepedFile
    */
  keeparchiveinservice(archive,name,additionalData){

    if (typeof(archive)!='object'){
    this.keepedFile=JSON.parse(archive
       .replace("IND_MaxMinRenovEol(","{\"IND_MaxMinRenovEol\" :")
       .replace("IND_MaxMin(", "{\"IND_MaxMin\" :")
       .replace("IND_DemandaRealGen(","{\"IND_DemandaRealGen\" :")
       .replace("IND_DemandaPrevProg(","{\"IND_DemandaPrevProg\" :")
       .replace(");", "}")
     );
   } else this.keepedFile=archive;
     this.archiveName=name;
     this.aditionalData=additionalData;
  }

  getarchivefromservice(){
    //console.log("llamada a getmyarchive desde myarchivedata");
    return this.keepedFile;
  }

  getNameOfArchive(){
    return this.archiveName;
  }

  getAditionalData(){
     return this.aditionalData;
  }


  getArchivesByDate(url,query){
    const httpOptionsDate = {
     headers: new HttpHeaders({
       'Accept':'application/json; application/vnd.esios-api-v1+json',
       'Content-Type':'application/json',
       'Authorization':'Token token="65ea46a74c7372e0776cbe0a216543288fb804d6e0b5c2603c0bae449b39c824"',
     }),
     params: new HttpParams().set('date', query)
    };

    return this.http.get(url,httpOptionsDate);

  }

  getArchivesDateTaxonomy(url,date,taxonomy){
    const httpOptionsDate = {
     headers: new HttpHeaders({
       'Accept':'application/json; application/vnd.esios-api-v1+json',
       'Content-Type':'application/json',
       'Authorization':'Token token="65ea46a74c7372e0776cbe0a216543288fb804d6e0b5c2603c0bae449b39c824"',
     }),
     params: new HttpParams().set('date',date).set('taxonomy_terms[]',taxonomy)
    };

    return this.http.get(url,httpOptionsDate);
  }

  getArchivesByDateStartEndDateType(url,start,end,dateType){
    const httpOptionsDate = {
     headers: new HttpHeaders({
       'Accept':'application/json; application/vnd.esios-api-v1+json',
       'Content-Type':'application/json',
       'Authorization':'Token token="65ea46a74c7372e0776cbe0a216543288fb804d6e0b5c2603c0bae449b39c824"',
     }),
     params: new HttpParams().set('start_date', start).set('end_date',end).set('date_type',dateType)
    };

    return this.http.get(url,httpOptionsDate);

  }

  getSpecificArchive(url,date){

    const httpOptionsSpecificArchive = {
     headers: new HttpHeaders({
       'Accept':'application/json; application/vnd.esios-api-v1+json',
       'Content-Type':'application/json',
       'Authorization':'Token token="65ea46a74c7372e0776cbe0a216543288fb804d6e0b5c2603c0bae449b39c824"',
     }),
     params: new HttpParams().set('date',date)
    };

    return this.http.get(url,httpOptionsSpecificArchive);

  }

  getJSONdataCalculations(url,start_date,end_date){
    const httpOptionsJSONdataCalculations = {
     headers: new HttpHeaders({
       'Accept':'application/json; application/vnd.esios-api-v1+json',
       'Content-Type':'application/json',
       'Authorization':'Token token="65ea46a74c7372e0776cbe0a216543288fb804d6e0b5c2603c0bae449b39c824"',
     }),
     params: new HttpParams().set('start_date',start_date).set('end_date',end_date)
    };

    return this.http.get(url,httpOptionsJSONdataCalculations);
  }


  downloadArchive(download_url){

    const httpOptionsDownload = {
     headers: new HttpHeaders({
       'Accept':'application/json; application/vnd.esios-api-v1+json',
       'Content-Type':'application/pdf',
       'Authorization':'Token token="65ea46a74c7372e0776cbe0a216543288fb804d6e0b5c2603c0bae449b39c824"',
     }),

    };

      return this.http.get(download_url,{responseType:"blob"});

  }


}
