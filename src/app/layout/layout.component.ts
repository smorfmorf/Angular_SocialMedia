import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../ui/sidebar/sidebar.component';
import { ProfileService } from '../services/profile.service';
import { HeaderComponent } from '../ui/header/header.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  // profileService = inject(ProfileService);
  // ngOnInit(): void {
  //   this.profileService.getMe().subscribe();
  // }
}
