# Sprint 3: Directives, Pipes & Forms

- **What was done:** Implemented About Us page. On page i have displayed three cards,team members,(also standalone component) using @for. To show team members ,wrote TeamMember model with neccessery fields and also sepearte team-data.ts file, which ahs ready-to-use array with information of each members(for now it's just mock data).
To connecetd card component with it's parent , i used input() signal to send member from About us to card components. 
Anotehr thing worth mentioning, as part of practising learned to create custom directives. Both add classes to the card elements. One expands the card when clicked and other just added lift and shadow effects. I know it could have been done with ordinary css,but i wanted to see how custom directives look like and how are they used.
- **Problems:** One annoying issue: footer moved with expanding of the cards. Turns out i had minor issues and wrong styling in sccs file
- **What I learned:** As mentioned, learned some infromation about custom directives. one thing i remember vividly: hostbindng decorator is used to add classes(attributes i guess) to the elements that we use this specific directive on :)
- **Time spent:** 3 hours ( genuiny for design reasons lol)
