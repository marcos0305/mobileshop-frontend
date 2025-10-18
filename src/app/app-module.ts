import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    CommonModule,    
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: []
})
export class AppModule { }
