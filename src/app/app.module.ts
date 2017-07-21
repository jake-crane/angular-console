import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ConfigurationListComponent } from '../components/configuration-list/configuration-list.component';
import { HeaderComponent } from '../components/page-header/page-header.component';
import { AppComponent } from './app.component';
import { HttpModule }    from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ConfigurationsService } from '../services/configuration-service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConfigurationListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [ConfigurationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }