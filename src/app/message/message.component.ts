import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Message } from '../interfaces/message';
import { MessageState } from '../state/message/message.reducers';
import { selectMessages } from '../state/message/message.selectors';
import { listenStreamData, addNewMessage, addNewFavorite } from '../state/message/message.actions';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  public showFavoritesActive: Boolean = false;
  public buttonText: string = 'Show Favorites';
  private componentDestroy$: Subject<boolean> = new Subject();

  public messageArray$: Observable<Message[]> = this.messageStore.pipe(
    select(selectMessages),
    filter(state => !!state)
  );

  public filteredMessages$: Observable<Message[]> = this.messageArray$.pipe(
    map((messages) => {   
      return messages.filter(m => m.message.isFavorite === true);
    }),
    takeUntil(this.componentDestroy$)
  );

  ngOnInit(): void {
    this.messageStore.dispatch(listenStreamData());

    // this code below is for using dummy data in case of pubnub service is not working or takes too long to get a response

    // let newMessage: Message = {
    //   message: {
    //     id: 123456,
    //     isFavorite: false,
    //     text: 'This is a new message!',
    //     user: {
    //         screen_name: 'raulgcCR',
    //         profile_image_url: 'https://i.blogs.es/11469c/darth-vader/1366_2000.jpeg',
    //         profile_image_url_https: 'https://i.blogs.es/11469c/darth-vader/1366_2000.jpeg',
    //         name: 'Raul Gonzalez',
    //     }
    //   }
    // };
    // let newMessage2: Message = {
    //   message: {
    //     id: 222222,
    //     isFavorite: false,
    //     text: 'This is a new message 2!',
    //     user: {
    //         screen_name: 'raulgcCR2',
    //         profile_image_url: 'https://i.blogs.es/11469c/darth-vader/1366_2000.jpeg',
    //         profile_image_url_https: 'https://i.blogs.es/11469c/darth-vader/1366_2000.jpeg',
    //         name: 'Raul Gonzalez2',
    //     }
    //   }
    // };
    // let newMessage3: Message = {
    //   message: {
    //     id: 333333,
    //     isFavorite: false,
    //     text: 'This is a new message 3!',
    //     user: {
    //         screen_name: 'raulgcCR3',
    //         profile_image_url: 'https://i.blogs.es/11469c/darth-vader/1366_2000.jpeg',
    //         profile_image_url_https: 'https://i.blogs.es/11469c/darth-vader/1366_2000.jpeg',
    //         name: 'Raul Gonzalez3',
    //     }
    //   }
    // };
    // this.messageStore.dispatch(addNewMessage({newMessage: newMessage}));
    // this.messageStore.dispatch(addNewMessage({newMessage: newMessage2}));
    // this.messageStore.dispatch(addNewMessage({newMessage: newMessage3}));
  }

  ngOnDestroy(): void {
    this.componentDestroy$.next(true);
    this.componentDestroy$.unsubscribe();
  }

  // function for marking as favorite any tweet message displayed in the screen
  markAsFavorite(isFavorite: boolean, id: number): void {
    this.messageStore.dispatch(addNewFavorite({isFavorite: !isFavorite, id: id}));
  }

  // function for triggering the show all functionality. It changes the button label and the Observable to show what the users wants
  showFavorites(): void {
    if(this.showFavoritesActive){
      this.buttonText = 'Show Favorites';
    } else {
      this.buttonText = 'Show All';
    }
    this.showFavoritesActive = !this.showFavoritesActive;
  }

  constructor(private messageStore: Store<MessageState>) { }

}
