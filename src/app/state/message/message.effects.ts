import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { MessageService } from "../../message.service";
import * as CustomActions from "./message.actions";

@Injectable()
export class MessageEffects {

    constructor(private actions$: Actions, private messageService: MessageService ){ }

    listenData$ = createEffect(() => this.actions$.pipe(
        ofType(CustomActions.listenStreamData),
        switchMap(() => this.messageService.getMessagesObservable().pipe(
          filter(message => !!message),
          map(message => CustomActions.addNewMessage({newMessage: message})),
          catchError(() => EMPTY)
        ))
      ));
}