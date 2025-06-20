import { JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserCheck, LucideAngularModule } from 'lucide-angular';
import { Profile } from '../../services/profile.service';
import { ImgUrlPipe } from '../../pipe/img-url.pipe';

@Component({
  standalone: true,
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  imports: [LucideAngularModule, ImgUrlPipe, JsonPipe], // Подключаем модуль LucideAngularModule
})
export class ProfileCardComponent {
  readonly UserCheck = UserCheck;
  // Props:
  @Input() profile?: Profile;
  @Input() max?: string;
}
