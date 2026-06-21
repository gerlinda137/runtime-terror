import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Typography } from '../shared/directive';
import { MemberCardComponent } from './ui/member-card/member-card.component'
import { TeamMember } from './team-member.model';
import { TEAM_MEMBERS } from './team-data';

@Component({
  selector: 'app-about-us',
  imports: [Typography, MemberCardComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush //added it just for practise, as part of sprint 3 ( even though it won't be needed in angular 22+)
})
export class AboutUsComponent {
  readonly teamMembers: TeamMember[] = TEAM_MEMBERS; // ordinary array, cuz it's static info, no need for signals
}
