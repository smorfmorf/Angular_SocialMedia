import { Component, forwardRef, HostListener, signal } from '@angular/core';
import { svg } from '../../../../../common-ui/src/lib/components/svg/svg.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-stack-input',
  imports: [svg, FormsModule],
  templateUrl: './stack-input.component.html',
  styleUrl: './stack-input.component.scss',

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => StackInputComponent),
    },
  ],
})

// Теперь чтобы всю эту хуйню понимал FormControl нужно передать его в компонент где FormControlName
export class StackInputComponent implements ControlValueAccessor {
  value = signal<string[]>(['angular']);
  ghostInput = '';

  @HostListener('keydown.enter', ['$event.target.value'])
  onEnter(value: string) {
    if (!this.ghostInput) return;

    this.value.set([...this.value(), this.ghostInput]);
    this.ghostInput = '';
  }

  onDelete(idx: number) {
    const tags = this.value();
    tags.splice(idx, 1);
    this.value.set(tags);
  }

  writeValue(stack: string[] | null): void {
    if (!stack) {
      this.value.set([]);
      return;
    }

    this.value.set(stack);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  onChange() {}

  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}
}
