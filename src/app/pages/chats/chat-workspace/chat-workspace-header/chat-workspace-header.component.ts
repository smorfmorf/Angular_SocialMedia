import { Component, input } from '@angular/core';
import { Profile } from '../../../../services/profile.service';
import { AvatarComponent } from '../../../../ui/avatar/avatar.component';

@Component({
  selector: 'app-chat-workspace-header',
  imports: [AvatarComponent],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
})
export class ChatWorkspaceHeaderComponent {
  profile = input<Profile>();
}
