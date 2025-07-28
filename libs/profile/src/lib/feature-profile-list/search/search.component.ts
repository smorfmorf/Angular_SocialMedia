import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../../../../../libs/profile/src/lib/ui/profile-card/profile-card.component';
import { ProfileService } from '../../../../../../libs/profile/src/lib/services/profile.service';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { Store } from '@ngrx/store';
import { selectProfileFilters } from '@tt/data-acsses';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  imports: [ProfileCardComponent, ProfileFiltersComponent],
})
export class SearchComponent {
  // запрашиваем у Angular экземпляр нашего сервиса
  ProfileService = inject(ProfileService);
  // profiles = this.ProfileService.filteredProfiles;

  store = inject(Store);
  profiles = this.store.selectSignal((selectProfileFilters));

  // profiles: Profile[] = [];
  // constructor() {
  //   // подписка на ответ успеха
  //   this.ProfileService.getTestAccounts().subscribe((val) => {
  //     console.log('val: ', val);
  //     this.profiles = val;
  //   });
  // }
}
