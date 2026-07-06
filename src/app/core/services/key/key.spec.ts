import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting }
  from '@angular/common/http/testing';

import { KeyService } from './key';
import * as C from '../../../shared/constants';
import { environment } from '../../../../environments/environments';
import { CreateKeyPayload } from '../../models';

describe('KeyService', () => {
  let service: KeyService;
  let httpMock: HttpTestingController;

  const base = environment.apiUrl;
  const keyPoint = `${base}/${C.ROUTES.API_KEYS}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        KeyService,
      ],
    });

    service = TestBed.inject(KeyService);
    httpMock = TestBed.inject(HttpTestingController);
  });;

  afterEach(() => {
    httpMock.verify();
  });

  it('should get keys', () => {
    const mockKeys = [
      { id: '1', name: 'Key1' },
      { id: '2', name: 'Key2' },
    ];

    service.getKeys().subscribe(keys => {
      expect(keys.length).toBe(2);
      expect(keys).toEqual(mockKeys);
    });

    const req = httpMock.expectOne(keyPoint);
    expect(req.request.method).toBe('GET');
    req.flush(mockKeys);
  });

  it('should add key', () => {
    const payload: CreateKeyPayload = { name: 'NewKey', apiKey: 'new-api-key', secret: 'new-secret', exchange: C.EXCHANGE_KEY };
    const mockKey = { id: '123', name: 'NewKey' };

    service.addKey(payload).subscribe(key => {
      expect(key).toEqual(mockKey);
    });

    const req = httpMock.expectOne(keyPoint);
    expect(req.request.method).toBe('POST');
    req.flush(mockKey);
  });

  it('should delete key', () => {
    const id = '123';

    service.deleteKey(id).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(`${keyPoint}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
