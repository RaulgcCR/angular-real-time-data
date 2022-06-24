import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PubNubAngular } from 'pubnub-angular2';
import { environment } from '../environments/environment';
import { Message } from './interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private channel: string;
  private pubNubSubscribeKey = environment.pubNubSubscribeKey;
  private messages$ = new Subject<Message>();

  constructor(private pubnub: PubNubAngular) {
    this.channel = 'pubnub-twitter';
    this.pubnub = pubnub;
  }

  getMessagesObservable(): Observable<Message> {

    this.pubnub.init({
      subscribeKey: this.pubNubSubscribeKey,
      uuid: this.pubNubSubscribeKey,
    });

    this.pubnub.getMessage(this.channel, msg => {
      this.messages$.next(msg);
    });

    this.pubnub.subscribe({
        channels: [this.channel],
        triggerEvents: ['message']
    });

    return this.messages$.asObservable();
  }
}
