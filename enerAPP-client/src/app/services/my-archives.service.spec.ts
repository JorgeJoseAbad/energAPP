import { TestBed, inject } from '@angular/core/testing';

import { MyArchivesService } from './my-archives.service';

describe('MyArchivesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyArchivesService]
    });
  });

  it('should be created', inject([MyArchivesService], (service: MyArchivesService) => {
    expect(service).toBeTruthy();
  }));
});
