import { TeamMember } from './team-member.model';

export const TEAM_MEMBERS: TeamMember[] = [
    {
        id: 1,
        name: 'John Doe',
        role: 'Founder & CEO',
        imgSrc: 'assets/team/person1.jpg',
        bio: 'Loves building products and leading the team through chaos and coffee.',
        githubLink: 'https://github.com/johndoe'
    },
    {
        id: 2,
        name: 'Jane Smith',
        role: 'CTO',
        imgSrc: 'assets/team/person2.jpg',
        bio: 'Architect of the codebase and occasional bug whisperer.',
        githubLink: 'https://github.com/janesmith'
    },
    {
        id: 3,
        name: 'Alex Lee',
        role: 'Lead Designer',
        imgSrc: 'assets/team/person3.jpg',
        bio: 'Turns wireframes into something people actually want to look at.',
        githubLink: 'https://github.com/alexlee'
    }
];