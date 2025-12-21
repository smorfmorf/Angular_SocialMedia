import { AfterViewInit, Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityService, ProfileService } from '@tt/data-acsses';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from "@tt/common-ui";

@Component({
  selector: 'lib-community',
  imports: [CommonModule, ImgUrlPipe],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss',
})
export class CommunityComponent {

  constructor() {
    firstValueFrom(this.communityService.getCommunities());

    effect(() => {
      console.log('getMe changed:', this.getMe());
      console.log('posts: ', this.posts());

    })
  }
  communityService = inject(CommunityService);
  posts = this.communityService.comunities;

  profileService = inject(ProfileService)
  getMe = this.profileService.myAccount;


}
