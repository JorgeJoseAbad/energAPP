import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { MyListArchivesComponent } from './my-list-archives/my-list-archives.component';

import { MyArchivesService} from './services/my-archives.service';
import { MyCalculationsService} from './services/my-calculations.service';
import { MyArchiveDataComponent } from './my-archive-data/my-archive-data.component';
import { MyCalculationsComponent } from './my-calculations/my-calculations.component';
import { MyIntroComponent } from './my-intro/my-intro.component';
import { MyTableComponent } from './my-table/my-table.component';

const appRoutes: Routes = [
  { path: ''            ,redirectTo: 'intro', pathMatch: 'full'},
  { path: 'intro'       , component: MyIntroComponent},
  { path: 'table'       , component: MyTableComponent},
  { path: 'archive-list', component: MyListArchivesComponent },
  { path: 'archive-data', component: MyArchiveDataComponent },
  { path: 'calculations', component: MyCalculationsComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    MyListArchivesComponent,
    MyArchiveDataComponent,
    MyCalculationsComponent,
    MyIntroComponent,
    MyTableComponent
  ],
  imports: [
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes
      //{ enableTracing: true }  //<-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    ChartsModule,
    NgbModule

  ],
  providers: [MyArchivesService,MyCalculationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
