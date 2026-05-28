import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';
import { ACCESS_TOKEN } from '../../shared/constants';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TokenService
      ]
    });
    service = TestBed.inject(TokenService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null if there is no token'), () => {
    expect(service.token()).toBeNull();
  }

  it('should clear the token from signal and localStorage', () => {
    service.setToken('temporary-token');

    service.removeToken();

    expect(service.getToken()).toBeNull();
    expect(localStorage.getItem(ACCESS_TOKEN)).toBeNull();
  });

  it('should return true when token exists, and false when it does not', () => {
    expect(service.isAuthenticated()).toBeFalsy();

    service.setToken('valid-token');
    expect(service.isAuthenticated()).toBeTruthy();
  });

});
