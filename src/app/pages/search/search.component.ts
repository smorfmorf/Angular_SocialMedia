import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../ui/profile-card/profile-card.component';
import { Profile, ProfileService } from '../../services/profile.service';
import { ProfileFiltersComponent } from './profile-filters/profile-filters.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  imports: [ProfileCardComponent, ProfileFiltersComponent],
})
export class SearchComponent {
  // запрашиваем у Angular экземпляр нашего сервиса
  ProfileService = inject(ProfileService);
  profiles = this.ProfileService.filteredProfiles;

  // profiles: Profile[] = [];
  // constructor() {
  //   // подписка на ответ успеха
  //   this.ProfileService.getTestAccounts().subscribe((val) => {
  //     console.log('val: ', val);
  //     this.profiles = val;
  //   });
  // }
}
