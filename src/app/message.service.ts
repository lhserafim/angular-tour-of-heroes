import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message); // como é um array, faço o push
  }

  clear() {
    this.messages = [];
  }

  // constructor() { } removido neste exemplo
}
