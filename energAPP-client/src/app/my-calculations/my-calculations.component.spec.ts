import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCalculationsComponent } from './my-calculations.component';

describe('MyCalculationsComponent', () => {
  let component: MyCalculationsComponent;
  let fixture: ComponentFixture<MyCalculationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCalculationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCalculationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
