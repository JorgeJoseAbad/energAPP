import { TestBed, inject } from '@angular/core/testing';

import { MySendDataService } from './my-send-data.service';

describe('MySendDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MySendDataService]
    });
  });

  it('should be created', inject([MySendDataService], (service: MySendDataService) => {
    expect(service).toBeTruthy();
  }));
});
