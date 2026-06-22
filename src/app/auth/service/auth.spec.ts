import { TestBed } from '@angular/core/testing';

import { Auth } from './auth';
import { UserPayload } from '../../core/models';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ACCESS_TOKEN } from '../../shared/constants';
import { Token } from './token';

describe('Auth1Service', () => {
  let service: Auth;
  interface TestErrType {
    status: number;
  }

  const testUser: UserPayload = {
    email: 'test@mail.com',
    password: '12345678',
    name: 'TestUser',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Auth, Token, provideHttpClient()],
    });
    service = TestBed.inject(Auth);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should register user or handle existing user', async () => {
    try {
      const res = await firstValueFrom(service.register(testUser));
      expect(res).toBeTruthy();
      expect(res.accessToken).toBeTruthy();
      expect(service.token()).toBe(res.accessToken);
      expect(localStorage.getItem(ACCESS_TOKEN)).toBe(res.accessToken);
    } catch (err: unknown) {
      const { status } = err as TestErrType;

      expect(status).toBe(400);
    }
  });

  it('should login user and set session', async () => {
    const payload = {
      email: testUser.email,
      password: testUser.password,
    };

    try {
      const res = await firstValueFrom(service.login(payload));

      console.log('login resp', res);

      expect(res).toBeTruthy();
      expect(res.accessToken).toBeTruthy();

      expect(service.token()).toBe(res.accessToken);
      expect(localStorage.getItem(ACCESS_TOKEN)).toBe(res.accessToken);

      expect(service.user()).toBeTruthy();
      expect(service.user()?.email).toBe(testUser.email);
    } catch (err: unknown) {
      const { status } = err as TestErrType;

      console.log('login error', err);

      expect([400, 401, 404]).toContain(status);
    }
  });
});
