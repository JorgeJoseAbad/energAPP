import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()

export class MyArchivesService {

 httpOptions = {
  headers: new HttpHeaders({
    'Accept':'application/json; application/vnd.esios-api-v1+json',
    'Content-Type':'text',
    'Authorization':'Token token="65ea46a74c7372e0776cbe0a216543288fb804d6e0b5c2603c0bae449b39c824"',
  })
};

httpParams={
  params: new HttpParams().set('responseType', "Text")
}

keepedFile:any;
archiveName:any;

constructor(private http: HttpClient) { }

  getarchiveslist(archives_json_url):Observable<any>{
    console.log("llegamos a pedir lista ",archives_json_url);
    return this.http.get(archives_json_url,this.httpOptions)
  }

  getarchiveslistfiltered(archives_url,taxonomyTerm){

    const httpOptions = {
     headers: new HttpHeaders({
       'Accept':'application/json; application/vnd.esios-api-v1+json',
       'Content-Type':'application/json',
       'Authorization':'Token token="65ea46a74c7372e0776cbe0a216543288fb804d6e0b5c2603c0bae449b39c824"',
     }),
     params: new HttpParams().set('taxonomy_terms[]',taxonomyTerm)
    };

    console.log("llegamos a pedir lista ",archives_url);
    return this.http.get(archives_url,httpOptions)
  }

  getarchivePreview(full_url_archive):Observable<any>{
    //console.log(full_url_archive);
    let archive= this.http.get(full_url_archive,this.httpOptions);
    console.log(archive);
    return archive;
  }

  getarchive(full_url_archive):Observable<any>{
    //console.log(full_url_archive);
    let archive= this.http.get(full_url_archive,{responseType:'text'});
    console.log(archive);
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
  keeparchiveinservice(archive,name){
    //console.log("in sendarchive(archive) del servcio");
    this.keepedFile=JSON.parse(archive
       .replace("IND_MaxMinRenovEol(","{\"IND_MaxMinRenovEol\" :")
       .replace("IND_MaxMin(", "{\"IND_MaxMin\" :")
       .replace("IND_DemandaRealGen(","{\"IND_DemandaRealGen\" :")
       .replace("IND_DemandaPrevProg(","{\"IND_DemandaPrevProg\" :")
       .replace(");", "}")
     );

     this.archiveName=name;


  }

  getarchivefromservice(){
    //console.log("llamada a getmyarchive desde myarchivedata");
    return this.keepedFile;
  }

  getNameOfArchive(){
    return this.archiveName;
  }

  getArchivesByDate(url,query){
    const httpOptionsDate = {
     headers: new HttpHeaders({
       'Accept':'application/json; application/vnd.esios-api-v1+json',
       'Content-Type':'application/json',
       'Authorization':'Token token="65ea46a74c7372e0776cbe0a216543288fb804d6e0b5c2603c0bae449b39c824"',
     }),
     params: new HttpParams().set('Date', query)
    };

    console.log("llegamos a pedir archives por fecha",url);
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
    console.log(url,date,taxonomy);

    return this.http.get(url,httpOptionsDate);
  }

  getArchivesByDateStartEnd(url,start,end){
    const httpOptionsDate = {
     headers: new HttpHeaders({
       'Accept':'application/json; application/vnd.esios-api-v1+json',
       'Content-Type':'application/json',
       'Authorization':'Token token="65ea46a74c7372e0776cbe0a216543288fb804d6e0b5c2603c0bae449b39c824"',
     }),
     params: new HttpParams().set('start_date', start).set('end_date',end).set('date_type','datos')
    };

    return this.http.get(url,httpOptionsDate);

  }

}
