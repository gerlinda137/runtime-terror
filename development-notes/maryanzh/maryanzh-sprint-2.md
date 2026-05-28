Week_2
Task: https://github.com/rolling-scopes-school/tasks/blob/master/angular/tasks/angular-team-task/SPRINT2_CHECKPOINT.md
Topic: Routing & Signals (@angular/router, @angular/core)
Date: 24/05/2026 -

**What was done:**
week_1:
- Created GitHub issues for all Sprint 2 pages and routing tasks;
- Created backend project, implemented Auth module, Prisma User schema, Docker configuration;
- Implemented authentication & authorization on the server;
- Implemented AuthService on the frontend.

Implemented pages routes:
- Login Page — route + page template + lazy loading;
- Registration Page — route + page template + lazy loading.

**Problems:**
week_1:
- Understanding how to structure lazy-loaded routes using loadComponent;
- Added correct CORS configuration in NestJS main.ts.

**Solutions:**
week_1:
- Switched to modern Angular routing using loadComponent
- Add CORS headers in main.ts NestJS

**Learned:**
week_1:
- How to configure standalone routing with provideRouter()
- How to lazy-load components using loadComponent
- How to create functional guards with inject()
- Basics of signal(), computed(), and effect()
- How to structure pages and services in a standalone Angular project
- How CORS works in NestJS and why proper configuration is required

**Plans:**
1. Backend Enhancements:
- [+] Authentication & authorization implemented
- [ ] Extend backend to support secure storage of secret keys
(Prisma schema update + service logic)
- [ ] Implement server-side logic for saving & retrieving API keys
(Keys table, encryption, validation)

2. Sevices:
- [+] AuthService implemented
- [ ] Create a service for integration with the public API routes  
(market data, candles, tickers — from the task spec)

3. Routes & Lazy Loading
- [+] Login Page
- [+] Register Page
- [ ] Settings Page

4. Implement Settings Page:
- [ ] Create route + lazy loading via loadComponent
- [ ] Add child page Secret Keys
- [ ] Build a form for API key & secret key input

5. Create a Chart Component using public API data
(candlestick chart or line chart)
Integrate:
- custom pipe (formatting values)
- custom directive (UI behavior)
- Use signals for reactive updates

**Time spent:**
week_1:
1h


