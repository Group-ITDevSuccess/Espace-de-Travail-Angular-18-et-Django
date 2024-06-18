/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthsService } from './auths.service';

describe('Service: Auths', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthsService]
    });
  });

  it('should ...', inject([AuthsService], (service: AuthsService) => {
    expect(service).toBeTruthy();
  }));
});
