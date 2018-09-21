import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPVPCComponent } from './my-pvpc.component';

describe('MyPVPCComponent', () => {
  let component: MyPVPCComponent;
  let fixture: ComponentFixture<MyPVPCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPVPCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPVPCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
