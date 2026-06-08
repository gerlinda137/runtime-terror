# Sprint 2: Routing & Signals — 2026-06-08

- **What was done:**
  Created 404-not-found page and set up its route with lazy loading. At first it was eager. I thought, cuz it's not a heavy component, no need for lazy loading. But then i learned more about lazy loading and decided it's best to make this page lazy loaded too, since users rarely stumble upon it.
  While setting up the 404 page, i also learned about preload type of routing. Using it with lazy loading improves performance.
  Fixed and refactored token service, guard and interceptor with mentor's guide/help/comments on my PR. It had many 'issues'. I wrote them, yes, but they weren't great (you can tell it was beginner level code lol).
- **Plans:** Might create localStorageService
