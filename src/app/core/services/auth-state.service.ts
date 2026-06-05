import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  readonly user = signal<User | null>(null);

  readonly isAuthenticated = computed(() => !!this.user());

  setUser(user: User): void {
    this.user.set(user);
  }

  clearUser(): void {
    this.user.set(null);
  }
}
