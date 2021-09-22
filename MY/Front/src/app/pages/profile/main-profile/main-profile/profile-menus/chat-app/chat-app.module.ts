import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatAppRoutingModule } from './chat-app-routing.module';
import { ChatAppComponent } from './components/chat-app/chat-app.component';
import { ChatDetailComponent } from './components/chat-detail/chat-detail.component';
import { ScrollDirective } from './../chat-app/components/chat-detail/directive/scroll.directive';
import { ShareModule } from 'src/app/share/share.module';

@NgModule({
  declarations: [ChatAppComponent, ScrollDirective, ChatDetailComponent],
  imports: [
    CommonModule,
    ChatAppRoutingModule,
    ShareModule,
  ]
})
export class ChatAppModule { }
