import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPrecioFinalComponent } from './my-precio-final.component';

describe('MyPrecioFinalComponent', () => {
  let component: MyPrecioFinalComponent;
  let fixture: ComponentFixture<MyPrecioFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPrecioFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPrecioFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
