import { Component, inject } from '@angular/core';
import { ChatWorkspaceHeaderComponent } from './chat-workspace-header/chat-workspace-header.component';
import { ChatWorkspaceWrapperComponent } from './chat-workspace-wrapper/chat-workspace-wrapper.component';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ChatsService } from '../../services/chats.service';

@Component({
  selector: 'app-chat-workspace',
  imports: [
    ChatWorkspaceHeaderComponent,
    ChatWorkspaceWrapperComponent,
    AsyncPipe,
  ],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
})
export class ChatWorkspaceComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  chatService = inject(ChatsService);

  $activeChat = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'new') {
        return this.route.queryParams.pipe(
          filter(({ chatId }) => chatId),
          switchMap((params) => {
            return this.chatService.createChat(params['chatId']).pipe(
              switchMap((chat) => {
                this.router.navigate(['/chats', chat.id]);
                return of(null);
              })
            );
          })
        );
      }

      return this.chatService.getChatById(id);
    })
  );
}

// в самом низу самые общие либы
// интерфейсы на котором могут быть все построены либы другие (все должно сверху вниз)
