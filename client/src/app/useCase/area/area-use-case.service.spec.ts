import { TestBed } from '@angular/core/testing';

import { AreaUseCaseService } from './area-use-case.service';

describe('AreaUseCaseService', () => {
  let service: AreaUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
