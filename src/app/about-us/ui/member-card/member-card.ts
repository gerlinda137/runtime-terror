import { Component, input } from '@angular/core';
import { TeamMember } from '../../team-member.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HoverLift } from './hover-lift';
import { ClickExpand } from './click-expand';

@Component({
  selector: 'app-member-card',
  imports: [HoverLift, MatCardModule, MatIconModule, MatButtonModule, ClickExpand],
  templateUrl: './member-card.html',
  styleUrl: './member-card.scss',
})
export class MemberCard {
  member = input.required<TeamMember>();// required added ,cuz there is no point in rendering a card without a member(angular will display error if parent forgets to pass it)
}
