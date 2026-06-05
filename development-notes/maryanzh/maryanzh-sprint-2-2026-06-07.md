Week_2
Task: https://github.com/rolling-scopes-school/tasks/blob/master/angular/tasks/angular-team-task/SPRINT2_CHECKPOINT.md
Topic: Routing & Signals (@angular/router, @angular/core)
Date: 24/05/2026 - 07/06/2026

**What was done:**
week_1:
- Created GitHub issues for all Sprint 2 pages and routing tasks;
- Created backend project, implemented Auth module, Prisma User schema, Docker configuration;
- Implemented authentication & authorization on the server;
- Implemented AuthService on the frontend.
- Add Auth tests

week_2:
- Add Settings Page layout (Forms);
- Fix Sidebar component from rxjs to signal and css animation;
- Implemented ClickOutside directory;
- Refactor css variable;
- Add mixins for Input and Icon;
- Update base button classes;
- Add base responsive in app layout (grid + media);
- Fix theme setup when app started;
- Backend: 
-- Implemented UserService + texts;
-- Fix User scheme, add age field and +18 checker.

Implemented pages routes:
- Login Page — route + page template + lazy loading;
- Registration Page — route + page template + lazy loading.
- Account: Settings Page and ApiKeys Page + lazy loading;

**Problems:**
week_1:
- Understanding how to structure lazy-loaded routes using loadComponent;
- Added correct CORS configuration in NestJS main.ts.

week_2:
- burger open/close doesn't work;
- directive ClickOutside doesn't work;
- themes setup broke;

**Solutions:**
week_1:
- Switched to modern Angular routing using loadComponent
- Add CORS headers in main.ts NestJS

week_2:
- refactor to signal and css animation;
- add in component like appClickOutside (clickOutside)="cancel()";
- fix themes setup;

**Learned:**
week_1:
- How to configure standalone routing with provideRouter()
- How to lazy-load components using loadComponent
- How to create functional guards with inject()
- Basics of signal(), computed(), and effect()
- How to structure pages and services in a standalone Angular project
- How CORS works in NestJS and why proper configuration is required

week_2:
- How to use @HostListener(), instead addEventListener;
- How to use Angular animation in html component;
- How to add forms;


**Plans:**
1. Backend Enhancements:
- [+] Authentication & authorization implemented;
- [in Sprint 3 ] Extend backend to support secure storage of secret keys;
(Prisma schema update + service logic)
- [in Sprint 3 ] Implement server-side logic for saving & retrieving API keys
(Keys table, encryption, validation).

2. Services:
- [+] AuthService implemented;
- [+] Implemented User Service (update name, update password, add/update/delete avatar);
- [in Sprint 3] Create a service for integration with the public API routes. 
(market data, candles, tickers — from the task spec)

3. Routes & Lazy Loading
- [+] Login Page;
- [+] Register Page;
- [+] Settings Page.

4. Implement Account Settings Page, ApiKeys Page :
- [+] Create route + lazy loading via loadComponent;
- [+] Create SettingPAge layout;
- [in Sprint 3] Build a form for API key & secret key input

5. [in Sprint 3] Create a Chart Component using public API data
(candlestick chart or line chart)
Integrate:
- custom pipe (formatting values)
- custom directive (UI behavior)
- Use signals for reactive updates

**Time spent:**
week_1:
32h
week_2;
40h


