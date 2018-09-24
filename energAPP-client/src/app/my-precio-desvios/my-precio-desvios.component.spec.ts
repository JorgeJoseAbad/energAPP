import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPrecioDesviosComponent } from './my-precio-desvios.component';

describe('MyPrecioDesviosComponent', () => {
  let component: MyPrecioDesviosComponent;
  let fixture: ComponentFixture<MyPrecioDesviosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPrecioDesviosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPrecioDesviosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
