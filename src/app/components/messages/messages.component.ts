import { MessageService } from './../../services/message/message.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  // we use the "public" property to allow to use it in the tempalte
  constructor(public messageService: MessageService) {}
}
