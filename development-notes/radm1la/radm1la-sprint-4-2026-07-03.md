# Sprint 4: HTTP, RxJS & Testing — 2026-07-03

- **What was done:** Implemneted global service for websocket connections,using RxJs, that will be used in several pages and wrote test units, that test the working of service via fake websocket.
- **What I learned:** For the first time used generic type T in typescript. Found out they are similar to c++ templates. 
two interesting things: used Map as cache for preventing creation of same Observable if same stream is requested . And learned about share() fucntion that allows webscoket sharing,in my words. so it makes sure that all subscribers use/ connect to one websocket object instead of creating same ones sepeartly.
or can be said that without share() as Claude said Observable is cold,meaning it re runs its setup for every subscriber and creates new websocket. ANother thing, at first i thought Map and share did same thing ,so i was confused why use both, but Map deals with observable and share with webscoket objects,as mentioned.
Also debugged this service in dev tools,checking network tab. I worked on this component with the help of claude and there was this moment where it for debbuging just sugessted console.log for cheking wether ws actually closed, but a message wont tell much about function that was called after it, so instead i displayed the msg of closing in ws.onclose().
Well about unit tests, im beginning to understand them better.
- **aprox time spent:** 3-4h
