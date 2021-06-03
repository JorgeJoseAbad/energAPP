import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyChildArchiveComponent } from './my-child-archive.component';

describe('MyChildArchiveComponent', () => {
  let component: MyChildArchiveComponent;
  let fixture: ComponentFixture<MyChildArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyChildArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyChildArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
