import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';

import { Header } from './header';
import { MockUserStore } from './mock-user-store';
import { UserStore } from '../../core/store/user.store';

describe('Header Component (Vitest)', () => {
  let fixture: ComponentFixture<Header>;
  let component: Header;
  let mockStore: MockUserStore;

  beforeEach(() => {
    mockStore = new MockUserStore();

    TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        { provide: UserStore, useValue: mockStore }
      ]
    });

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
  });

  it('should update welcomeText when user arrives', () => {
    mockStore.emitUser({
      name: 'Mary',
      email: 'mary@example.com',
      id: '123',
      avatarUrl: null,
      createdAt: new Date().toString(),
    });

    fixture.detectChanges();

    expect(component.welcomeText()).toBe('Welcome Mary!');
  });

  it('should return correct mode icon', () => {
    fixture.componentRef.setInput('theme', 'light');
    fixture.detectChanges();

    expect(component.handleMode()).toBe('dark_mode');

    fixture.componentRef.setInput('theme', 'dark');
    fixture.detectChanges();

    expect(component.handleMode()).toBe('light_mode');
  });

  it('should call toggleTheme handler', () => {
    const spy = vi.fn();

    fixture.componentRef.setInput('toggleTheme', spy);
    fixture.detectChanges();

    component.handleTheme();

    expect(spy).toHaveBeenCalled();
  });
});
