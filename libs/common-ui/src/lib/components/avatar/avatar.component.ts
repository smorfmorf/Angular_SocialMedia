import { Component, input } from '@angular/core';
import { ImgUrlPipe } from '../../pipe/img-url.pipe';

@Component({
  selector: 'app-avatar',
  imports: [ImgUrlPipe],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  avatarUrl = input<string | null>();
  chatUrl = input<boolean | null>();
}
