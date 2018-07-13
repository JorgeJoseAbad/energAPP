import { Component, OnInit, Input } from '@angular/core';
import {MyArchivesService} from '../services/my-archives.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-list-archives',
  templateUrl: './my-list-archives.component.html',
  styleUrls: ['./my-list-archives.component.css']
})
export class MyListArchivesComponent implements OnInit {


  base_url='https://api.esios.ree.es/';
  archives_json_url=`${this.base_url}`+'archives_json';

  archive_ID:string;
error:any;
  archives:any;
  listarchives:any;
  archive:any;

  constructor(private archivesservice:MyArchivesService,
  private router:Router) { }

  ngOnInit() {


    console.log(this.archives_json_url);
  }

  getarchiveslist(){
    console.log("en getarchiveslist del componente");
     this.archivesservice.getarchiveslist(this.archives_json_url)
      .subscribe(
        (archives) => {
                        this.archives = archives;
                        console.log(this.archives.archives);
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

  getarchive(part_url_archive){
    let full_url_archive=`${this.base_url}`+part_url_archive
    console.log(full_url_archive);
    this.archivesservice.getarchive(full_url_archive)
    .subscribe(
      (archive)=>{
                  this.archive=archive
                  console.log(this.archive);
                  this.archivesservice.keeparchiveinservice(this.archive);
      },
      error=>{
        this.error=error;
        console.error('Oops:', error.message);
      },
      ()=>{this.router.navigate(['archive-data']);}
    )
  }

}
