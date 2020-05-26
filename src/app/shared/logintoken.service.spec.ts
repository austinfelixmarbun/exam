import { TestBed } from '@angular/core/testing';

import { LogintokenService } from './logintoken.service';

describe('LogintokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogintokenService = TestBed.get(LogintokenService);
    expect(service).toBeTruthy();
  });
});
