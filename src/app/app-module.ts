import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { App } from './app';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
  
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: []
})
export class AppModule { }
