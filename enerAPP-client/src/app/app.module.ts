import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { MyListArchivesComponent } from './my-list-archives/my-list-archives.component';

import {MyArchivesService} from './services/my-archives.service';
import { MyArchiveDataComponent } from './my-archive-data/my-archive-data.component';

const appRoutes: Routes = [
  { path: '',component: MyListArchivesComponent},
  { path: 'archive-list', component: MyListArchivesComponent },
  { path: 'archive-data', component: MyArchiveDataComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    MyListArchivesComponent,
    MyArchiveDataComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
      //{ enableTracing: true }  <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    ChartsModule,

  ],
  providers: [MyArchivesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
