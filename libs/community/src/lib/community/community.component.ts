import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityService } from '@tt/data-acsses';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'lib-community',
  imports: [CommonModule],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss',
})
export class CommunityComponent {
  communityService = inject(CommunityService);

  constructor() {
    firstValueFrom(this.communityService.getCommunities());
  }
}
