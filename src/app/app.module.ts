import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StateResolverService } from './core/resolvers/state-resolver.service';
import { AccessGuard } from './core/guards/access.guard';
import { LoadGuard } from './core/guards/load.guard';
import { MainModule } from './main/main.module';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MainModule,
    RouterModule.forRoot([])
  ],
  providers: [StateResolverService, AccessGuard, LoadGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
