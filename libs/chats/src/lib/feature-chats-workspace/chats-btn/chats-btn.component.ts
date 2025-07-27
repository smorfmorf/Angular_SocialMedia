import { Component, inject, input } from '@angular/core';
import { AvatarComponent } from '../../../../../common-ui/src/lib/components/avatar/avatar.component';
import { ProfileService } from '../../../../../profile/src/lib/services/profile.service';
import { myChat } from '../../services/chats.service';
import { DatePipe } from '@angular/common';
import { svg } from '../../../../../common-ui/src/lib/components/svg/svg.component';

@Component({
  selector: 'app-chats-btn',
  imports: [AvatarComponent, DatePipe, svg],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
})
export class ChatsBtnComponent {
  profile = inject(ProfileService).myAccount;
  chat = input<myChat>();
}
