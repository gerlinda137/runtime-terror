import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';

import { PasswordMatchService } from './password-match.service';

describe('PasswordMatchService', () => {
  let service: PasswordMatchService;
  const buildGroup = (password: string, confirmPassword: string) =>
    new FormGroup({
      password: new FormControl(password),
      confirmPassword: new FormControl(confirmPassword),
    });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordMatchService],
    });
    service = TestBed.inject(PasswordMatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null when passwords match', () => {
    const group = buildGroup('password123', 'password123');

    expect(service.match(group)).toBeNull();
  });

  it('should return an error when passwords do not match', () => {
    const group = buildGroup('password123', 'different');

    expect(service.match(group)).toEqual({ passwordMismatch: true });
  });

  it('should return null when both fields are empty', () => {
    const group = buildGroup('', '');

    expect(service.match(group)).toBeNull();
  });
});
