import { Component, OnInit, Input } from '@angular/core';
import { MyArchivesService} from '../services/my-archives.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-child-archive',
  templateUrl: './my-child-archive.component.html',
  styleUrls: ['./my-child-archive.component.css']
})
export class MyChildArchiveComponent implements OnInit {

  @Input() archive;

    base_url='https://api.esios.ree.es/';
    previewFile:any;
    error: any;
    listarchives:any;

  constructor(
    private archivesservice : MyArchivesService,
    private router : Router
  ) { }

  ngOnInit() {
    console.log("Archivo de datos: ",this.archive);
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
        /* Ojoo a esto, esta listarchives posiblemente sería la del padre*/
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
