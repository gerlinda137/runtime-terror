sprint-4
Date: 22/06/2026 - 06/07/2026

**What was done:**
1. Refactored AuthStore and UserStore:
- implemented login, registration, session restore
- implemented user loading and profile update
- aligned state structure and patching logic

2. Integrated stores with Header component:
- fixed user name not updating after login
- merged user streams from AuthStore and UserStore
- updated reactive UI via signals and computed

3. Implemented API Keys module:
- created ApiKey schema
- added public backend routes
- built KeyService

4.Implemented AddKeyPage (Form group)

5. Testing work:
- wrote tests for KeyService
- wrote tests for Header
- created MockUserStore
- resolved TestBed + Vitest compatibility issues

6. UI improvements:
- updated Header behavior (welcomeText, theme toggle)
- fixed user display after login
- improved canvas interactions
- added signals to the account page

**Problems:**
- Header did not update the user name after login.
- AuthStore and UserStore worked independently, causing inconsistent user state.
- Input signals could not be passed as plain functions in tests.
- Vitest lacked Angular‑specific helpers (no provideInput, no signal.set).
- KeyService tests required migration to provideHttpClientTesting.
- TestBed behavior differed under Vitest, causing async update issues.

**Solutions:**
- Combined AuthStore.user$ and UserStore.user$ using merge() inside Header.
- Used fixture.componentRef.setInput() for input signals in tests.
- Kept TestBed while running tests under Vitest.
- Created correct MockUserStore with BehaviorSubjects.
- Updated KeyService tests to use provideHttpClientTesting().
- Ensured Header recomputes welcomeText after user updates.
- Added signals to account page for reactive UI updates.

**Learned:**
- How RxJs use in service 
- How to architect stores properly in Angular 17 (AuthStore vs UserStore).
- - How InputSignal works and how to set inputs in tests.
- How Vitest behaves in Angular projects and how to integrate TestBed.
- How to mock stores and reactive streams correctly.
- How to use signals and computed for UI updates.
- How to structure public API routes and schemas for key management.

**Plans:**
1. Prepare the task presentation.
2. Final UI polishing:
- canvas improvements
- signals on account page
- minor visual fixes
3. Final test pass and cleanup.
4. Optional small refactoring of stores if time allows.

**Time spent:**
42h


