import { TestBed, inject } from '@angular/core/testing';

import { Auth.InterceptorService } from './auth.interceptor.service';

describe('Auth.InterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Auth.InterceptorService]
    });
  });

  it('should be created', inject([Auth.InterceptorService], (service: Auth.InterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
