import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PubNubAngular } from 'pubnub-angular2';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MessageComponent } from './message/message.component';
import { MessageEffects } from './state/message/message.effects';
import { reducer } from './state/message/message.reducers';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreModule.forFeature('message', reducer),
    StoreModule.forRoot({}, {}),
    EffectsModule.forFeature([MessageEffects]),
    EffectsModule.forRoot([]),
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatIconModule
  ],
  providers: [ PubNubAngular ],
  bootstrap: [AppComponent]
})
export class AppModule { }
