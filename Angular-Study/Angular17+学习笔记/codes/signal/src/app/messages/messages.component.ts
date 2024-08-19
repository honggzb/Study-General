import { Component, inject } from '@angular/core';
import { MessagesService } from './messages.service';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [NgClass],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {

  messagesService = inject(MessagesService);
  message = this.messagesService.message;

  onClose() {
    this.messagesService.clear();
  }

}
