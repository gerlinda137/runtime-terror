import { Component, input } from '@angular/core';
import { TeamMember } from '../../team-member.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HoverLiftDirective } from './hover-lift.directive';
import { ClickExpandDirective } from './click-expand.directive';

@Component({
  selector: 'app-member-card',
  imports: [HoverLiftDirective, MatCardModule, MatIconModule, MatButtonModule, ClickExpandDirective],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss',
})
export class MemberCardComponent {
  member = input.required<TeamMember>();// required added ,cuz there is no point in rendering a card without a member(angular will display error if parent forgets to pass it)
}
