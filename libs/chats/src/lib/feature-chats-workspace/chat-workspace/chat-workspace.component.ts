import { Component, inject } from '@angular/core';
import { ChatWorkspaceHeaderComponent } from './chat-workspace-header/chat-workspace-header.component';
import { ChatWorkspaceWrapperComponent } from './chat-workspace-wrapper/chat-workspace-wrapper.component';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, of, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ChatsService } from '../../../../../data-acsses/src/lib/chats/chats.service';

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
      console.log('id: ', id);

      if (id === 'new') {
        return this.route.queryParams.pipe(
          tap((params) => console.log('params_Tap: ', params)),
          filter(({ profile_Id }) => profile_Id),
          switchMap((params) => {
            return this.chatService.createChat(params['profile_Id']).pipe(
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
