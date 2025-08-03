import { debounce, debounceTime, map, startWith, switchMap } from 'rxjs';
import { Component, inject, effect } from '@angular/core';
import { ChatsBtnComponent } from '../chats-btn/chats-btn.component';
import { ChatsService } from '../../../../../data-acsses/src/lib/chats/chats.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-chats-list',
  imports: [
    ChatsBtnComponent,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
})
export class ChatsListComponent {
  chatService = inject(ChatsService);
  filterChatsControl = new FormControl('');

  // происходит запрос на бек(получили чаты) => изменили стрим и подписались на изменение контрола и когда он изменяется можем оперировать и чатами и значением контрола => по итогу мы изменяем значение стрима на отфильтрованые чаты

  // был один стрим, изменили на другой стрим и финальное значение стрима мы еще видоизменяем через map (видоизменяем на отфильтрованные чаты) воспользовались значениями которые были в 2х стримах и сделали новое
  $chats = this.chatService.getMyChats().pipe(
    switchMap((chats) =>
      this.filterChatsControl.valueChanges.pipe(
        startWith(''),
        map((inputValue) =>
          chats.filter((chat) =>
            chat.userFrom.firstName.includes(inputValue ?? '')
          )
        ),
        debounceTime(300)
      )
    )
  );

  constructor() {
    this.filterChatsControl.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }
}
