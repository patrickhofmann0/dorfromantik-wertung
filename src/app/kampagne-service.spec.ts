import { TestBed } from '@angular/core/testing';

import { KampagneService } from './kampagne-service';

describe('KampagneService', () => {
  let service: KampagneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KampagneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
