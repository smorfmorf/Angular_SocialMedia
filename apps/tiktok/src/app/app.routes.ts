import { Route, Routes } from '@angular/router';
import { LoginComponent } from '../../../../libs/auth/src/lib/feature-login/login/login.component';
import { SettingsComponent } from '../../../../libs/profile/src/lib/feature-profile-settings/settings/settings.component';
import { canActivateAuth } from '@tt/auth';
import { ProfileComponent, SearchComponent } from '@tt/profile';
import { ChatsComponent, ChatWorkspaceComponent } from '@tt/chats';
import { LayoutComponent } from '@tt/layout';
import { profileFeature } from 'libs/data-acsses/src/lib/store/reducer';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ProfileEffects } from 'libs/data-acsses/src/lib/store/actionts';

import { ZoloEb } from 'apps/tiktok/src/app/form/test/zoloEb';

// вся конфигурация роутов {path: 'путь' и компонент: который рендерим}
// + нужно сказать где им рендерится <router-outlet/> там где он стоит там и рендерит компонент
export const routes: Routes = [
  {
    canActivate: [canActivateAuth], //* Защитник роута
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'zolo', component: ZoloEb },
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      
// ~ [routerLink]="['/profile', profile.id]">
      { path: 'profile/:id', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent },
      {
        path: 'search',
        component: SearchComponent,
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects),
        ],
      },
      { path: 'chats', loadChildren: () => chatRoutes },
    ],
  },

  {
    path: 'login',
    component: LoginComponent,
    //! каждый редьюсер нужно куда-то подключить ЭТО для работы Store
    providers: [provideState(profileFeature), provideEffects(ProfileEffects)],
  },
];

//Чаты
const chatRoutes: Route[] = [
  {
    path: '',
    component: ChatsComponent,
    children: [{ path: ':id', component: ChatWorkspaceComponent }],
  },
];
