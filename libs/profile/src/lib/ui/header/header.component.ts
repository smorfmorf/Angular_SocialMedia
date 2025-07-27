import { Profile } from '@tt/interfaces/profile';
import {
  Component,
  computed,
  effect,
  EventEmitter,
  HostListener,
  Input,
  input,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImgUrlPipe } from '@tt/common-ui';
@Component({
  selector: 'app-header',
  imports: [ImgUrlPipe, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  //  можно сразу сделать props сигналом как в React
  profile = input<Profile>();

  ngOnInit(): void {
    console.log(this.profile());
  }
}
