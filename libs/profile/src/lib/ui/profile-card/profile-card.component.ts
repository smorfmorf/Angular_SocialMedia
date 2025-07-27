import { Profile } from '@tt/interfaces/profile';
import { Component, input, Input, signal } from '@angular/core';
import { UserCheck, LucideAngularModule } from 'lucide-angular';
import { ImgUrlPipe } from '@tt/common-ui';

@Component({
  standalone: true,
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  imports: [LucideAngularModule, ImgUrlPipe], // Подключаем модуль LucideAngularModule
})
export class ProfileCardComponent {
  readonly UserCheck = UserCheck;
  // Props:
  @Input() profile?: Profile;
  @Input() max?: string;
}
