import { Profile } from '@tt/interfaces/profile';
import { Component, input } from '@angular/core';
import { AvatarComponent } from '@tt/common-ui';

@Component({
  selector: 'app-chat-workspace-header',
  imports: [AvatarComponent],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
})
export class ChatWorkspaceHeaderComponent {
  profile = input<Profile>();
}
