import { createReducer, on } from "@ngrx/store";
import * as Actions from "./message.actions";
import { Message } from "../../interfaces/message";

export interface MessageState {
    messages: Message[];
}

export const initialState: MessageState = {
    messages: [],
};

export const reducer = createReducer(
    initialState,
    on(
        Actions.addNewMessage,
      (state, { newMessage }) => ({ ...state, messages: [ ...state.messages, newMessage ] })
    ),
    on(
      Actions.addNewFavorite,
    (state, { isFavorite, id }) => {
      const messageFavInd = state.messages.findIndex(message => message.message.id === id);
      return { ...state, messages: [
          ...state.messages.slice(0, messageFavInd),
          {
            ...state.messages[messageFavInd],
            message: { ...state.messages[messageFavInd].message, isFavorite: isFavorite }
          },
          ...state.messages.slice(messageFavInd + 1)
        ]
      }
    }
  ),
);