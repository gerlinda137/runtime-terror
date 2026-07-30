import { TeamMember } from './team-member.model';

export const TEAM_MEMBERS: TeamMember[] = [
    {
        id: 1,
        name: 'John Doe',
        role: 'Founder & CEO',
        imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3LnWJY0eqZcJZEZMJnyDaiocwZlLGNYPVww&s',
        bio: 'Loves building products and leading the team through chaos and coffee.',
        githubLink: 'https://github.com/johndoe'
    },
    {
        id: 2,
        name: 'Jane Smith',
        role: 'CTO',
        imgSrc: 'https://tr.rbxcdn.com/180DAY-d4a6d1564bf7c0e65447501bdb3cc584/420/420/FaceAccessory/Webp/noFilter',
        bio: 'Architect of the codebase and occasional bug whisperer.',
        githubLink: 'https://github.com/janesmith'
    },
    {
        id: 3,
        name: 'Maryia Vashchayeva',
        role: 'Frontend/Backend developer',
        imgSrc: 'assets/webP/maryanzh.webp',
        bio: `I am a JavaScript/TypeScript developer with 2.5 years of experience building modern, user‑focused frontend applications using React. I also have a solid background in Node.js and backend fundamentals, which helps me understand API structure, server‑side workflows, and full‑stack application architecture.
I have completed the RS School Node.js (NestJS) course, where I built REST APIs, worked with PostgreSQL, Prisma ORM, and Docker, and gained hands‑on experience with backend development using NestJS.
I also have practical experience working with AI‑powered development tools, including Microsoft Copilot, using AI assistance for code generation, refactoring, documentation, architectural decisions, and improving developer productivity in both frontend and backend tasks.
Additionally, I developed backend integration with Binance API as part of my Crypto‑Trade project, implementing secure API communication, request signing, data processing, and building a modular NestJS backend for trading operations.
Repository: https://github.com/MaryAnzh/Crypto-Trade-Angular_Task-Backend
My goal is to grow as a Full‑Stack Developer, combining strong frontend expertise with practical backend skills. I prefer remote work and enjoy contributing to well‑structured, maintainable projects with clean architecture and clear documentation.
Key skills: React, JavaScript, TypeScript, Node.js, NestJS, REST API, PostgreSQL, Prisma ORM, Docker, Git, Agile, Remote Collaboration, AI‑assisted development, Binance API integration.`,
        githubLink: 'https://github.com/maryanzh'
    }
];
