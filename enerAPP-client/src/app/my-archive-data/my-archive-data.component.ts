import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyArchivesService} from '../services/my-archives.service';

@Component({
  selector: 'app-my-archive-data',
  templateUrl: './my-archive-data.component.html',
  styleUrls: ['./my-archive-data.component.css']
})
export class MyArchiveDataComponent implements OnInit {
 archive:any;
dataArchives:any;
keys: any;
 titleArchive:string="no loaded";

  constructor(private route: ActivatedRoute,
              private archivesservice: MyArchivesService) { }

  ngOnInit() {

  }

  ngDoCheck(){
    this.archive=this.archivesservice.getarchivefromservice();
    this.titleArchive=Object.keys(this.archive)[0];
    this.dataArchives=Object.values(Object.values(this.archive))[0];

    console.log(this.dataArchives);
  
    console.log("in ngDoCheck of my-archive-data");
    console.log(this.archive);
  }




}
