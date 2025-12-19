import { Component, output } from '@angular/core';

@Component({
  selector: 'lib-infinity-scroll-trigger',
  imports: [],
  templateUrl: './infinity-scroll-trigger.component.html',
  styleUrl: './infinity-scroll-trigger.component.scss',
})
export class InfinityScrollTriggerComponent {
  loaded = output<void>();

  ngOnInit() {
    console.log('emit');
    this.loaded.emit();
  }

  ngOnDestroy() {
    console.log('destroy');
  }
}
