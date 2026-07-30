import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environments';
import { UserStore } from '../../store/user.store';
import { AuthStore } from '../../store/auth.store';

@Injectable({ providedIn: 'root' })
export class ServerHealthService {
  private http = inject(HttpClient);
  private auth = inject(AuthStore);
  private userStore = inject(UserStore);

  initApp() {
    return this.checkServerHealth();
  }

  checkServerHealth() {
    return this.http.get(`${environment.apiUrl}/health`);
  }

  handleServerUp() {
    if (this.auth.isAuthenticatedSig()) {
      this.userStore.loadUser();
    }
  }
}
