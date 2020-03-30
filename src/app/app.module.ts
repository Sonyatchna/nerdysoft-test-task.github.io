import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';
import { ModalComponent } from './modules/modal/modal.component';
import { ShareTaskModalComponent } from './modules/share-task-modal/share-task-modal.component';
import { notifierConfig } from './consts/notifierConfig';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    ShareTaskModalComponent
  ],
  entryComponents: [
    ModalComponent,
    ShareTaskModalComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    NotifierModule.withConfig(notifierConfig),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
