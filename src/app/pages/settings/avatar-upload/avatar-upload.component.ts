import { Component, signal } from '@angular/core';
import { svg } from '../../../ui/svg/svg.component';
import { DndDirective } from '../../../directives/dnd.directive';

@Component({
  selector: 'app-avatar-upload',
  imports: [svg, DndDirective],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss',
})
export class AvatarUploadComponent {
  preview = signal<string>('/Img.svg');

  avatarURL: File | null = null;

  fileBrowserEventHandler(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    console.log('file: ', file);
    if (!file || !file.type.match('image')) {
      return;
    }
    const reader = new FileReader();
    // когда файл будет загружен браузером, и в result - будет картинка в base64
    reader.onload = (event) => {
      this.preview.set(event.target?.result?.toString() ?? '');
    };

    reader.readAsDataURL(file);
    this.avatarURL = file;
  }

  onFileDropped(file: File) {
    if (!file || !file.type.match('image')) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      this.preview.set(event.target?.result?.toString() ?? '');
    };

    reader.readAsDataURL(file);
    this.avatarURL = file;
  }
}
