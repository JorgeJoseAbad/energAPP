import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListArchivesComponent } from './my-list-archives.component';

describe('MyListArchivesComponent', () => {
  let component: MyListArchivesComponent;
  let fixture: ComponentFixture<MyListArchivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyListArchivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyListArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
