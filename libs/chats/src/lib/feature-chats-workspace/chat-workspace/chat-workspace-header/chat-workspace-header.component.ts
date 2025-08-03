import { Component, input } from '@angular/core';
import { AvatarComponent } from '@tt/common-ui';
import { Profile } from '@tt/data-acsses';

@Component({
  selector: 'app-chat-workspace-header',
  imports: [AvatarComponent],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
})
export class ChatWorkspaceHeaderComponent {
  profile = input<Profile>();
}
