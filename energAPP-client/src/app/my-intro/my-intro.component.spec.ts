import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyIntroComponent } from './my-intro.component';

describe('MyIntroComponent', () => {
  let component: MyIntroComponent;
  let fixture: ComponentFixture<MyIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
