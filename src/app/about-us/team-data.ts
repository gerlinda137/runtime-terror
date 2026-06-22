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
        name: 'Alex Lee',
        role: 'Lead Designer',
        imgSrc: 'https://avatarfiles.alphacoders.com/319/thumb-1920-319252.jpg',
        bio: 'Turns wireframes into something people actually want to look at.',
        githubLink: 'https://github.com/alexlee'
    }
];