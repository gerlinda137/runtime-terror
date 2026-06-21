import { Component, input } from '@angular/core';
import { TeamMember } from '../../team-member.model';

@Component({
  selector: 'app-member-card',
  imports: [],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss',
})
export class MemberCardComponent {
  member = input.required<TeamMember>();// required added ,cuz there is no point in rendering a card without a member(angular will display error if parent forgets to pass it)
}
