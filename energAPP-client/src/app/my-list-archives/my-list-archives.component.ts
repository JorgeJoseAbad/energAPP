import { Component, OnInit, Input } from '@angular/core';
import {MyArchivesService} from '../services/my-archives.service';
import { Router } from '@angular/router';

import { HttpResponse} from '@angular/common/http' //to download pdv

import { Subscription } from 'rxjs/Rx'; //to download pdf
import { Headers, RequestOptions, RequestMethod, RequestOptionsArgs, URLSearchParams } from '@angular/http'; //to download pdf
import { Subject } from 'rxjs/Rx'; //to download pdf


@Component({
  selector: 'app-my-list-archives',
  templateUrl: './my-list-archives.component.html',
  styleUrls: ['./my-list-archives.component.css']
})
export class MyListArchivesComponent implements OnInit {


  base_url='https://api.esios.ree.es/';
  archives_url=`${this.base_url}`+'archives';
  archives_json_url=`${this.base_url}`+'archives_json';
  archives_filtered_json_url=`${this.base_url}`+'archives_json?taxonomy_terms[]=Potencia';
  archive_ID:string;
  error:any;
  archives:any;
  listarchives:any;
  archive:any;
  previewFile:any;

  constructor(private archivesservice:MyArchivesService,
  private router:Router) { }

  ngOnInit() {


    console.log(this.archives_json_url);
  }


  getarchiveslist(){
    console.log("en getarchiveslist del componente");
     this.archivesservice.getarchiveslist(this.archives_url)
      .subscribe(
        (archives) => {
                        this.archives = archives;
                        console.log(this.archives);
                        this.listarchives=this.archives.archives;
        },
        error=>{
          console.log(error);
        },
        ()=>{
          console.log("Retrieved all files")
        }
      );
  }

  getarchivesjsonlist(){
    console.log("en getarchiveslist del componente");
     this.archivesservice.getarchiveslist(this.archives_json_url)
      .subscribe(
        (archives) => {
                        this.archives = archives;
                        console.log(this.archives);
                        this.listarchives=this.archives.archives;
        },
        error=>{
          console.log(error);
        },
        ()=>{
          console.log("Retrieved all files")
        }
      );
  }

  // filtering is only posible for non-JSON files, so this.archives_url
  getarchiveslistfiltered(taxTerm){
    this.archivesservice.getarchiveslistfiltered(this.archives_url,taxTerm)
     .subscribe(
       (archives) => {
                       this.archives = archives;
                       console.log(this.archives);
                       this.listarchives=this.archives.archives;
       },
       error=>{
         console.log(error);
       },
       ()=>{
         console.log("Retrieved all files")
       }
     );
  }

  getarchive(part_url_archive,name){
    let full_url_archive;
    if (typeof(part_url_archive)=="number"){
      full_url_archive=`${this.base_url}`+'archives/'+part_url_archive
      this.archivesservice.getarchivePreview(full_url_archive)
      .subscribe(
        (response:any)=>{

                    this.previewFile=response;
                    console.log(this.previewFile);

        },
        (error:any)=>{
          this.error=error;
          console.error('Oops:', error.message);
        },
        ()=>{console.log("show archivedata")}
      )
    }
    else {
      full_url_archive=`${this.base_url}`+part_url_archive
      console.log(full_url_archive);

      this.archivesservice.getarchive(full_url_archive)
      .subscribe(
        (response:any)=>{

                    this.archive=response;
                    console.log(this.archive);
                    this.archivesservice.keeparchiveinservice(this.archive,name);
        },
        error=>{
          this.error=error;
          console.error('Oops:', error.message);
        },
        ()=>{this.router.navigate(['archive-data']);}
      )
    }
  }

  getarchivesByDate(value){
    console.log("getarchivesByDate()",value);
    let full_url_archive;
    full_url_archive=`${this.base_url}`+'archives/';
    console.log(full_url_archive);
    let query_params;
    query_params=value+':59.000+00:00'; //seconds.microseconds and ??
    console.log(query_params);
    this.archivesservice.getArchivesByDate(full_url_archive,query_params)
      .subscribe(
        (response:any)=>{
          this.archive=response;
          console.log(this.archive);
          this.listarchives=this.archive.archives;

        },
        error=>{
          this.error=error;
          console.error('Oops:', error.message);
        },
      )
  }


  getarchivesDateTaxonomy(myDate,taxterm){
    console.log(myDate,taxterm);
    let full_url_archive;
    full_url_archive=`${this.base_url}`+'archives/';
    let date_query=myDate+'59.000+00:00';

    this.archivesservice.getArchivesDateTaxonomy(full_url_archive,date_query,taxterm)
    .subscribe(
      (response:any)=>{
        this.archive=response;
        console.log(this.archive);
        this.listarchives=this.archive.archives;

      },
      error=>{
        this.error=error;
        console.error('Oops:', error.message);
      },
    )
  }

  getarchivesStartEndDateDateType(start,end,dateType){
    console.log(start,end);

    let full_url_archive;
    full_url_archive=`${this.base_url}`+'archives/';
    let start_query,end_query;
    start_query=start+':59.000+00:00';
    end_query=end+':59.000+00:00';

    this.archivesservice.getArchivesByDateStartEndDateType(full_url_archive,start_query,end_query,dateType)
    .subscribe(
      (response:any)=>{
        this.archive=response;
        console.log(this.archive);
        this.listarchives=this.archive.archives;
      },
      error=>{
        this.error=error;
        console.error('Oops:', error.message);
      },
    )
  }

  getSpecificArchive(id,date){
    console.log(id,date);
    let full_url_archive;
    full_url_archive=`${this.base_url}`+'/archives/'+id;
    let arrayListArchives=[];

    this.archivesservice.getSpecificArchive(full_url_archive,date)
    .subscribe(
      (response:any)=>{
        this.archive=response;
        console.log(this.archive);
        arrayListArchives.push(this.archive.archive);
        console.log(arrayListArchives);
        this.listarchives=arrayListArchives;
      },
      error=>{
        this.error=error;
        console.error('Oops:', error.message);
      },
    )
  }

  getJSONdataCalculations(id,start_date,end_date){
    console.log(id,start_date,end_date);
    let full_url_archive=`${this.base_url}`+'calculator-data/'+id;
    this.archivesservice.getJSONdataCalculations(full_url_archive,start_date,end_date)
    .subscribe(
      (response:any)=>{
        this.archive=response;
        console.log(this.archive);
        console.log(this.archive.data);
        console.log(this.archive.data.archive_values);
        this.archivesservice.keeparchiveinservice(this.archive,"Data");
      },
      error=>{
        this.error=error;
        console.error('Oops:', error.message);
      },
      ()=>{this.router.navigate(['archive-data']);}
    )
  }

  downloadArchive(id,name,type){
    let nameOfFileToDownload=name+'.'+type;
    let full_url_archive=`${this.base_url}`+'/archives/'+id+'/download';
    this.archivesservice.downloadArchive(full_url_archive)
    .subscribe(
      success=>{
        console.log("SUCESS")
        var blob = new Blob([success], { type: type });

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, nameOfFileToDownload);
        } else {
            let a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = nameOfFileToDownload;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    },
      error=>{
        this.error=error;
        console.error('Oops:', error.message);
      },
      ()=>{console.log("downloaded")}
    )
  }

}
