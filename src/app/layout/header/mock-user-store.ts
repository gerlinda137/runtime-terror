import { BehaviorSubject } from 'rxjs';
import type { User } from '../../core/models';

export class MockUserStore {
  private userSub = new BehaviorSubject<User | null>(null);
  private loadingSub = new BehaviorSubject<boolean>(false);
  private errorSub = new BehaviorSubject<string | null>(null);

  user$ = this.userSub.asObservable();
  loading$ = this.loadingSub.asObservable();
  error$ = this.errorSub.asObservable();

  emitUser(user: User | null) {
    this.userSub.next(user);
  }

  emitLoading(isLoading: boolean) {
    this.loadingSub.next(isLoading);
  }

  emitError(error: string | null) {
    this.errorSub.next(error);
  }

  loadUser() {
    return undefined;
  }
}
