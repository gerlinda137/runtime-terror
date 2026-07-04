import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environments";
import { ApiKey, CreateKeyPayload } from "../../models";
import * as C from "../../../shared/constants";

@Injectable({ providedIn: 'root' })
export class KeyService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;
  private keyPoint = `${this.base}/${C.ROUTES.API_KEYS}`;

  getKeys() {
    return this.http.get<ApiKey[]>(this.keyPoint);
  }

  addKey(payload: CreateKeyPayload) {
    return this.http.post<ApiKey>(this.keyPoint, payload);
  }

  deleteKey(id: string) {
    return this.http.delete(`${this.keyPoint}/${id}`);
  }
}
