import { Component, effect, inject, ViewChild, viewChild } from '@angular/core';
import {
  Profile,
  ProfileService,
} from '../../../../../data-acsses/src/lib/profile/profile.service';
import {
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { HeaderComponent } from '../../ui/header/header.component';
import { AvatarUploadComponent } from '../../ui/avatar-upload/avatar-upload.component';
import { StackInputComponent } from '@tt/common-ui';

@Component({
  selector: 'app-settings',
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    AvatarUploadComponent,
    StackInputComponent,
  ],
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
    stack: [{ value: '' }],
  });

  constructor() {
    // запускает функцию каждый раз когда сигнал меняется (сперва myAccount пустой, потом пришел ответ и там данные)
    effect(() => {
      console.log(this.profile());

      //@ts-ignore
      this.form.patchValue({
        ...this.profile(),
        // stack: this.mergeStack(this.profile()?.stack),
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

    console.log(this.form.value);

    //@ts-ignore
    firstValueFrom(
      this.profileService.patchProfile({
        ...this.form.value,
        // stack: this.splitStack(this.form.value.stack),
      } as Partial<Profile>)
    );
  }

  //! Хелпер можно удалить
  // splitStack(stack: string | null | string[] | undefined) {
  //   if (Array.isArray(stack)) return stack;
  //   return stack ? stack.split(',') : [];
  // }
  // mergeStack(stack: string | null | string[] | undefined) {
  //   if (Array.isArray(stack)) return stack.join(',');
  //   return stack;
  // }
}
