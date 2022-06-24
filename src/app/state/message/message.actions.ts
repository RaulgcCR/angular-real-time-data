import { createAction, props } from '@ngrx/store';
import { Message } from '../../interfaces/message';

export const listenStreamData = createAction('[Messages Page] Listen Stream Data');

export const addNewMessage = createAction(
    '[Messages Page] Add New Message',
    props<{ newMessage: Message }>()
);

export const addNewFavorite = createAction(
    '[Messages Page] Add New Favorite',
    props<{ isFavorite: boolean, id: number }>()
);