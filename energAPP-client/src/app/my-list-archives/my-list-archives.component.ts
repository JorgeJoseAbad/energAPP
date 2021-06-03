import { Component, OnInit, Input } from '@angular/core';
import { MyArchivesService} from '../services/my-archives.service';
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
  //archive:any;
  previewFile:any;



  constructor(
    private archivesservice:MyArchivesService,
    private router:Router
  ) { }

  ngOnInit() {
    console.log(this.archives_json_url);
  }


  getarchiveslist(){

     this.archivesservice.getarchiveslist(this.archives_url)
      .subscribe(
        (response:any) => {
                        //this.archives = response;
                        this.listarchives=response.archives;
        },
        error=>{
          this.error = error;
          console.error("Ooops! ",error.message);
        },
        ()=>{
          console.info("Retrieved all files by getarchiveslist");
        }
      );
  }

  getarchivesjsonlist(){

     this.archivesservice.getarchiveslist(this.archives_json_url)
      .subscribe(
        (response:any) => {
                        //this.archives = response;
                        this.listarchives=response.archives;
        },
        error=>{
          this.error = error;
          console.error("oops!! ", error.message);
        },
        ()=>{
          console.info("Retrieved all files by getarchivesjsonlist");
        }
      );
  }

  // filtering is only posible for non-JSON files, so this.archives_url
  getarchiveslistfiltered(taxTerm){
    this.archivesservice.getarchiveslistfiltered(this.archives_url,taxTerm)
     .subscribe(
       (response:any) => {
                       //this.archives = response;
                       this.listarchives=response.archives;
       },
       error=>{
         this.error = error;
         console.error("oops!! ", error.message);
       },
       ()=>{
         console.info("Retrieved all files by getarchiveslistfiltered");
       }
     );
  }

  getarchive(part_url_archive,name){
    let full_url_archive;
    //Archive preview
    if (typeof(part_url_archive)=="number"){
      full_url_archive=`${this.base_url}`+'archives/'+part_url_archive
      this.archivesservice.getarchivePreview(full_url_archive)
      .subscribe(
        (response:any)=>{
                    this.previewFile=response;
        },
        (error:any)=>{
          this.error = error;
          console.error('Oops:', error.message);
        },
        ()=>{console.log("show archivedata")}
      )
    }
    else {
      //get archive and keep it in service
      full_url_archive=`${this.base_url}`+part_url_archive


      this.archivesservice.getarchive(full_url_archive)
      .subscribe(
        (response:any)=>{
                    //this.archive=response;
                    this.archivesservice.keeparchiveinservice(response,name,'');
        },
        error=>{
          this.error = error;
          console.error('Oops:', error.message);
        },
        ()=>{this.router.navigate(['archive-data']);}
      )
    }
  }

  getarchivesByDate(value){

    let full_url_archive;
    full_url_archive=`${this.base_url}`+'/archives';

    let query_params;
    query_params=value+':59+00:00'; //seconds and ??

    this.archivesservice.getArchivesByDate(full_url_archive,query_params)
      .subscribe(
        (response:any)=>{
          //this.archive=response;
          this.listarchives=response.archives;
        },
        error=>{
          this.error=error;
          console.error('Oops:', error.message);
        }
      )
  }


  getarchivesDateTaxonomy(myDate,taxterm){

    let full_url_archive;
    full_url_archive=`${this.base_url}`+'archives/';
    let date_query=myDate+':59+00:00';

    this.archivesservice.getArchivesDateTaxonomy(full_url_archive,date_query,taxterm)
    .subscribe(
      (response:any)=>{
        //this.archive=response;
        this.listarchives=response.archives;
      },
      error=>{
        this.error=error;
        console.error('Oops:', error.message);
      }
    )
  }

  getarchivesStartEndDateDateType(start,end,dateType){


    let full_url_archive;
    full_url_archive=`${this.base_url}`+'archives/';
    let start_query,end_query;
    start_query=start+':59.000+00:00';
    end_query=end+':59.000+00:00';

    this.archivesservice.getArchivesByDateStartEndDateType(full_url_archive,start_query,end_query,dateType)
    .subscribe(
      (response:any)=>{
        //this.archive=response;
        this.listarchives=response.archives;
      },
      error=>{
        this.error=error;
        console.error('Oops:', error.message);
      }
    )
  }

  getSpecificArchive(id,date){

    let full_url_archive;
    full_url_archive=`${this.base_url}`+'/archives/'+id;
    let arrayListArchives=[];
    let ndate=date+':59+00:00';
    let myresponse; //keep response for preview

    this.archivesservice.getSpecificArchive(full_url_archive,ndate)
    .subscribe(
      (response:any)=>{
        arrayListArchives.push(response.archive);
        myresponse=response;
        this.listarchives=arrayListArchives; //this clear list archives, with only this one response
      },
      error=>{
        this.error=error;
        console.error('Oops:', error.message);
      },
      ()=>{console.log(arrayListArchives["0"]);
           this.previewFile=myresponse}
    )
  }

  getJSONdataCalculations(id,name,start_date,end_date){
    debugger;
    let full_url_archive=`${this.base_url}`+'calculator-data/'+id;
    this.archivesservice.getJSONdataCalculations(full_url_archive,start_date,end_date)
    .subscribe(
      (response:any)=>{
        //this.archive=response;

        this.archivesservice.keeparchiveinservice(response,name,'Data between: '+ `${start_date}`+ ' and ' +`${end_date}`);
      },
      error=>{
        this.error=error;
        console.error('Oops:', error.message);
      },
      ()=>{this.router.navigate(['archive-data']);}
    )
  }

  downloadArchive(download_url,name,type){
    let nameOfFileToDownload=name+'.'+type;
    //let full_url_archive=`${this.base_url}`+'/archives/'+id+'/download';

    let full_url_archive=`${this.base_url}`+download_url;
    this.archivesservice.downloadArchive(full_url_archive)
    .subscribe(
      success=>{

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
