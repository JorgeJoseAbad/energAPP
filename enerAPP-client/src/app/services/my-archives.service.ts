import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';

@Injectable()

export class MyArchivesService {

 httpOptions = {
  headers: new HttpHeaders({
    'Accept':'application/json; application/vnd.esios-api-v1+json',
    'Content-Type':'application/json',
    'Authorization':'Token token="65ea46a74c7372e0776cbe0a216543288fb804d6e0b5c2603c0bae449b39c824"',
  })
};

archiveKeeped:any;



  constructor(private http: HttpClient) { }

getarchiveslist(archives_json_url){
  console.log("llegamos a pedir lista ",archives_json_url);
  return this.http.get(archives_json_url,this.httpOptions)
}

getarchive(full_url_archive){
  console.log(full_url_archive);
  let archive= this.http.get(full_url_archive,this.httpOptions);
  return archive;
}


keeparchiveinservice(archive){
  console.log("in sendarchive(archive) del servcio");
  this.archiveKeeped=archive;

  console.log("INKEAPARCHIVEINSERVICE",archive);
}

getarchivefromservice(){
  console.log("llamada a getmyarchive desde myarchivedata");
  return this.archiveKeeped;
}

}
