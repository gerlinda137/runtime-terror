import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { UserPayload } from '../../core/models';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ACCESS_TOKEN } from '../../shared/constants';

describe('Auth1Service', () => {
  let service: AuthService;
  interface TestErrType { status: number }

  const testUser: UserPayload = {
    email: 'test@mail.com',
    password: '12345678',
    name: 'TestUser'
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient()
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should register user or handle existing user', async () => {
    try {
      const res = await firstValueFrom(service.register(testUser));
      ;
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
