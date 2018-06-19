import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  entryComponents: [ AppComponent ]
})
export class AppModule {
  constructor(private _injector: Injector) {
    if(!customElements.get('app-root')) {
      customElements.define('app-root', createCustomElement(AppComponent, {injector: this._injector}))
    }
  }
  ngDoBootstrap() {}
}
