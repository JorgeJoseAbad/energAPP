import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyArchiveDataComponent } from './my-archive-data.component';

describe('MyArchiveDataComponent', () => {
  let component: MyArchiveDataComponent;
  let fixture: ComponentFixture<MyArchiveDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyArchiveDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyArchiveDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
