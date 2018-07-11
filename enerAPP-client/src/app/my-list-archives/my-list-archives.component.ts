import { Component, OnInit, Input } from '@angular/core';
import {MyArchivesService} from '../services/my-archives.service';

@Component({
  selector: 'app-my-list-archives',
  templateUrl: './my-list-archives.component.html',
  styleUrls: ['./my-list-archives.component.css']
})
export class MyListArchivesComponent implements OnInit {
  @Input() base_url:string;

  archives_json_url:string;
  archive_ID:string;
  ID:any=3179;
  archives:any;
  listarchives:any;
  archive:any;

  constructor(private archivesservice:MyArchivesService) { }

  ngOnInit() {
    this.archives_json_url=`${this.base_url}`+'archives_json';
    this.archive_ID=`${this.base_url}`+'archive'+this.ID;
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
                 }
    )
  }

}
