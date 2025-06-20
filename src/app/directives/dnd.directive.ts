import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[DndDirective]',
})
// директива(компонент без шаблона) - можем к компоненту добавить логику
export class DndDirective {
  // свое событие тоже самое что $emit во Vue
  @Output() fileDropped = new EventEmitter<any>();

  //* Для расскраски
  //добавляем класс к компоненту
  @HostBinding('class.fileover')
  fileOver = false;

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
  }
  //*

  //! Event для броска файла
  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;

    // Передаем evemt-дропа родителю
    this.fileDropped.emit(event.dataTransfer?.files[0]);
  }
}
