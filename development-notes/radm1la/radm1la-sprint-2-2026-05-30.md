# Sprint 2: Routing & Signals — 2026-05-30
(don't mind grammar and 'syntax')

here is what i remember:

- **What was done:** 
So, fisrt thing we did before the second sprint began, was a meeting. We decided what to do with our folders/structure and solved an issue with Typography + file nameings. We talked with our mentor and plus asked others too a little bit, for example i talked with my uni professor.
After that, issues were created on GitHub and we chose what each of us will do.
So what i did:
so far three tasks: token service, auth guard and auth interceptor.
I was confused in what order to do them,so i had a conversation with AI. Afterwards, firstly i wrote token service(it was logical to begin with this one, cuz other two components needed to inject this service to work). I separated token management from authService and refactored authService to use this service and for the first time , i wrote unit tests. Turns out it's not so hard to write one.
Today i created interceptor which ,in brief, connects JWT token to HTTP requests and catches 401 error(error code from swagger docs) and calls logout(). And then in the end , implemented authGuard that protects private routes.
- **Problems:**
woudn't call it a problem,but i had never written tests and guard before, so i struggled with them a bit and as always had some issues with GitHub branches, but i am learning.
- **Solutions:** 
Well, i read some information on internet, checked my old project i did in angular where i had already used interceptor ,and asked a lot of questions to AI.
- **What I learned:**
How to create Guard and use it on routes/components via canActivate: [GUARDS NAME]. 
Whats createUrlTree and that before this developers explicitly returned f.e. false and plus used routes.navigate() ,but createUlTree does both for you.
- **Plans:** write 404 not found page, implement route for it using ,maybe, lazy loading.
- **Time spent:** approx. 2-3 hours
