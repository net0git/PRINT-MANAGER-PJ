import { TestBed } from '@angular/core/testing';

import { SedeUseCaseService } from './sede-use-case.service';

describe('SedeUseCaseService', () => {
  let service: SedeUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SedeUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
