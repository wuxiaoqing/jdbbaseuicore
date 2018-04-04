import { TestBed, inject } from '@angular/core/testing';

import { JdbPlgBaseService } from './jdb-plg-base.service';

describe('JdbPlgBaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JdbPlgBaseService]
    });
  });

  it('should be created', inject([JdbPlgBaseService], (service: JdbPlgBaseService) => {
    expect(service).toBeTruthy();
  }));
});
