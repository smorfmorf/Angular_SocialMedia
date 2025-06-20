import { Route, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SearchComponent } from './pages/search/search.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LayoutComponent } from './layout/layout.component';
import { canActivateAuth } from './services/acess.guard';
import { SettingsComponent } from './pages/settings/settings.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { ChatWorkspaceComponent } from './pages/chats/chat-workspace/chat-workspace.component';

// вся конфигурация роутов {path: 'путь' и компонент: который рендерим}
// + нужно сказать где им рендерится <router-outlet></router-outlet>  там где он стоит там и рендерит компонент
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'profile/:id', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'search', component: SearchComponent },
      { path: 'chats', loadChildren: () => chatRoutes },
    ],
    //* Защитник роута
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginComponent },
];

//Чаты
const chatRoutes: Route[] = [
  {
    path: '',
    component: ChatsComponent,
    children: [{ path: ':id', component: ChatWorkspaceComponent }],
  },
];
