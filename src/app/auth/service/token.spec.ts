import { TestBed } from '@angular/core/testing';

import { Token } from './token';
import { ACCESS_TOKEN } from '../../shared/constants';

describe('Token', () => {
  let service: Token;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [Token],
    });
    service = TestBed.inject(Token);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null if there is no token', () => {
    expect(service.token()).toBeNull();
  });

  it('should clear the token from signal and localStorage', () => {
    service.setToken('temporary-token');

    service.removeToken();

    expect(service.token()).toBeNull();
    expect(localStorage.getItem(ACCESS_TOKEN)).toBeNull();
  });

  it('should set the token in signal and localStorage', () => {
    service.setToken('test-token');

    expect(service.token()).toBe('test-token');
    expect(localStorage.getItem(ACCESS_TOKEN)).toBe('test-token');
  });
});
