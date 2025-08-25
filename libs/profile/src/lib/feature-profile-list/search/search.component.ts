import { selectProfileFiltered } from '@tt/data-acsses';
import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../../../../../libs/profile/src/lib/ui/profile-card/profile-card.component';
import { ProfileService } from '../../../../../data-acsses/src/lib/profile/profile.service';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { Store } from '@ngrx/store';
import { InfinityScrollTriggerComponent } from '../../../../../common-ui/src/lib/components/infinity-scroll-trigger/infinity-scroll-trigger.component';
import { prfoileActions } from 'libs/data-acsses/src/lib/store/actionts';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  imports: [
    ProfileCardComponent,
    ProfileFiltersComponent,
    InfinityScrollTriggerComponent,
  ],
})
export class SearchComponent {
  // запрашиваем у Angular экземпляр нашего сервиса
  ProfileService = inject(ProfileService);
  // profiles = this.ProfileService.filteredProfiles;
  store = inject(Store);
  profiles = this.store.selectSignal(selectProfileFiltered);

  console = console;

  constructor() {
    console.log('profiles: ', this.profiles());
  }

  timeToFetch() {
    console.log('7566436');
    this.store.dispatch(prfoileActions.setPage({}));
  }

  onIntersection(entries: any) {
    console.log('✌️entries --->', entries);
    const entry = entries[0];
    if (entry.isIntersecting) {
      this.timeToFetch();
    }
  }

  // profiles: Profile[] = [];
  // constructor() {
  //   // подписка на ответ успеха
  //   this.ProfileService.getTestAccounts().subscribe((val) => {
  //     console.log('val: ', val);
  //     this.profiles = val;
  //   });
  // }
}
