import { TeamMember } from './team-member.model';

export const TEAM_MEMBERS: TeamMember[] = [
    {
        id: 1,
        name: 'John Doe',
        role: 'Founder & CEO',
        imgSrc: 'https://s3-alpha.figma.com/hub/file/2944732189/b47472b8-4e17-477e-a0a8-d5fcbed6a374-cover.png',
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