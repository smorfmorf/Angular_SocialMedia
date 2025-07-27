import { PostListComponent } from '@tt/posts';
import { ProfileService } from '../../services/profile.service';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap, firstValueFrom } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { svg } from '../../../../../common-ui/src/lib/components/svg/svg.component';
import { RouterLink } from '@angular/router';
import { ImgUrlPipe } from '@tt/common-ui';
import { HeaderComponent } from '../../ui/header/header.component';

@Component({
  selector: 'app-profile',
  imports: [
    HeaderComponent,
    AsyncPipe,
    svg,
    RouterLink,
    ImgUrlPipe,
    PostListComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  profileService = inject(ProfileService);
  // chatService = inject(ChatsService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  $subscribers = this.profileService.getSubscribers(5);
  $myAccount = toObservable(this.profileService.myAccount);
  isMyProfile = signal(false);

  // поток параметров если будем кликать на другие id сюда в этот стрим будут приходить эти idшники
  $profile = this.route.params.pipe(
    switchMap(({ id }) => {
      this.isMyProfile.set(id === 'me');

      if (id === 'me') {
        return this.$myAccount;
      }
      // чужой профиль
      return this.profileService.getAccount(id);
    })
  );

  async sendMessage(id: number) {
    // const res = await firstValueFrom(this.chatService.createChat(id));
    // this.router.navigate(['/chats', res.id]);

    this.router.navigate(['/chats', 'new'], {
      queryParams: { chatId: id },
    });
  }

  //! Мои тесты Angular
  onTestAngular(event: any) {
    console.log('Получено событие fileDropped:', event);
  }
}
