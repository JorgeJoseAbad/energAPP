import { TestBed, inject } from '@angular/core/testing';

import { MyCalculationsService } from './my-calculations.service';

describe('MyCalculationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyCalculationsService]
    });
  });

  it('should be created', inject([MyCalculationsService], (service: MyCalculationsService) => {
    expect(service).toBeTruthy();
  }));
});
