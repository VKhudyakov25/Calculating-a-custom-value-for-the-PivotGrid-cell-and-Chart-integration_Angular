import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppService } from './app.service';

import {
  DxButtonModule,
  DxTextBoxModule,
  DxSelectBoxModule,
} from 'devextreme-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DxButtonModule, DxTextBoxModule, DxSelectBoxModule],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
