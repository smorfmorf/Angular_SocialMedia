import { Component, inject, input, Input, signal } from '@angular/core';
import { UserCheck, LucideAngularModule } from 'lucide-angular';
import { ImgUrlPipe } from '@tt/common-ui';
import { Router } from '@angular/router';
import { Profile } from 'libs/data-acsses/src/lib/profile/profile.service';

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
  router = inject(Router);

  async sendMessage(id: number) {
    // const res = await firstValueFrom(this.chatService.createChat(id));
    // this.router.navigate(['/chats', res.id]);
    this.router.navigate(['/chats', 'new'], {
      queryParams: { chatId: id },
    });
  }
}
