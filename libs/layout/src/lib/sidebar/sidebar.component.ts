import { ProfileService } from '../../../../data-acsses/src/lib/profile/profile.service';
import { Component, inject } from '@angular/core';
import { svg } from '../../../../common-ui/src/lib/components/svg/svg.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SubscriberCardComponent } from '../subscriber-card/subscriber-card.component';
import { AsyncPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '@tt/common-ui';
@Component({
  selector: 'app-sidebar',
  imports: [
    svg,
    RouterLink,
    RouterLinkActive,
    SubscriberCardComponent,
    AsyncPipe,
    ImgUrlPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  profileService = inject(ProfileService);
  //чтобы вывести в шаблон с Бека можем не делать подписку и переменную с результатом, а просто декларативно через pipe - async (он сделает сам подписку и отписку)
  $subscribers = this.profileService.getSubscribers(3);
  myAccount = this.profileService.myAccount;

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: '/search',
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: '/chats',
    },
  ];

  ngOnInit(): void {
    //* как можно не подписываясь выполнить запрос: Когда делаем подписку нужно сделать отписку. firstValueFrom - получаем Promise и он сам выполняется и потом "умирает".
    firstValueFrom(this.profileService.getMe());
  }
}
