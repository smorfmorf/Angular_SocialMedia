import { Component, inject, input } from '@angular/core';
import { AvatarComponent } from '../../../ui/avatar/avatar.component';
import { ProfileService } from '../../../services/profile.service';
import { myChat } from '../../../services/chats.service';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-chats-btn',
  imports: [AvatarComponent, DatePipe, NgClass],
  templateUrl: './chats-btn.component.html',
  styleUrl: './chats-btn.component.scss',
})
export class ChatsBtnComponent {
  profile = inject(ProfileService).myAccount;
  chat = input<myChat>();
}
