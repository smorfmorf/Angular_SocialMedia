import { Profile } from '@tt/interfaces/profile';
import { Injectable, signal } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class GlobalStoreService {
  myAccount = signal<Profile | null>(null);
}
