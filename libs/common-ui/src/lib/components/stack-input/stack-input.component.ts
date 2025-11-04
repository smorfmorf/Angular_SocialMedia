import {
  Component,
  forwardRef,
  HostBinding,
  HostListener,
  signal,
} from '@angular/core';
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
      // multi: true нужно использовать в 1) CVA 2) для валидаторов (директив) 3) для интерсепторов в http
      multi: true,
      useExisting: forwardRef(() => StackInputComponent),
    },
  ],
})

//! Разработал ui-kit тк кто будет это юзать нужно повесить formControlName и все  <lib-stack-input formControlName="stack"/>
//! тк компонент знает как работать внутри себя, вся логика инкапсулирована
//* поэтому ангуляровские формы такие гибкие и классные ТК CVA ты сделал всю логику и все.

// Теперь чтобы всю эту хуйню понимал FormControl нужно передать его в компонент где FormControlName
export class StackInputComponent implements ControlValueAccessor {
  value = signal<string[]>(['angular']);
  ghostInput = '';
  disabled = false;
  onChange(value: string[] | null) { }

  @HostListener('keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();

    if (!this.ghostInput) return;

    this.value.set([...this.value(), this.ghostInput]);
    this.ghostInput = '';

    this.onChange(this.value());
  }

  @HostBinding('class.disabled')
  get isDisabled() {
    return this.disabled;
  }

  onDelete(idx: number) {
    const tags = this.value();
    tags.splice(idx, 1);
    this.value.set(tags);

    this.onChange(this.value());
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

  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void {
    console.log('✌️isDisabled --->', isDisabled);
    this.disabled = isDisabled;
  }
}
