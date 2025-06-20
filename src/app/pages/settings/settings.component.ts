import { Component, effect, inject, ViewChild, viewChild } from '@angular/core';
import { HeaderComponent } from '../../ui/header/header.component';
import { Profile, ProfileService } from '../../services/profile.service';
import {
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AvatarUploadComponent } from './avatar-upload/avatar-upload.component';

@Component({
  selector: 'app-settings',
  imports: [HeaderComponent, ReactiveFormsModule, AvatarUploadComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  //! антипатер получить данные с другого компонента
  @ViewChild(AvatarUploadComponent) avatarUpload!: AvatarUploadComponent;

  profileService = inject(ProfileService);
  profile = this.profileService.myAccount;

  fb = inject(FormBuilder);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
  });

  constructor() {
    // запускает функцию каждый раз когда сигнал меняется (сперва myAccount пустой, потом пришел ответ и там данные)
    effect(() => {
      console.log(this.profile());

      this.form.patchValue({
        ...this.profile(),
        //@ts-ignore
        stack: this.mergeStack(this.profile()?.stack),
      });
    });
  }

  onSave() {
    console.log(1);
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }

    if (this.avatarUpload.avatarURL) {
      firstValueFrom(
        this.profileService.uploadAvatar(this.avatarUpload.avatarURL!)
      );
    }

    //@ts-ignore
    firstValueFrom(
      this.profileService.patchProfile({
        ...this.form.value,
        stack: this.splitStack(this.form.value.stack),
      } as Partial<Profile>)
    );
  }

  splitStack(stack: string | null | string[] | undefined) {
    if (Array.isArray(stack)) return stack;
    return stack ? stack.split(',') : [];
  }
  mergeStack(stack: string | null | string[] | undefined) {
    if (Array.isArray(stack)) return stack.join(',');
    return stack;
  }
}
