import { TestBed } from '@angular/core/testing';

import { TetumtraService } from './tetumtra.service';

describe('TetumtraService', () => {
  let service: TetumtraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TetumtraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
