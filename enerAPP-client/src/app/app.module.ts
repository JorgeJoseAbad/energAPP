import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';



import { AppComponent } from './app.component';
import { MyListArchivesComponent } from './my-list-archives/my-list-archives.component';

import {MyArchivesService} from './services/my-archives.service';

@NgModule({
  declarations: [
    AppComponent,
    MyListArchivesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [MyArchivesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
