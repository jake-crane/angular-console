import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ConfigurationsComponent } from './components/configurations/configurations.component';
import { ConfigurationService } from './services/configuration/configuration.service';
import { HttpModule } from '@angular/http';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { CommunicationsComponent } from './components/communications/communications.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: ConfigurationsComponent },
  { path: 'application', component: ConfigurationsComponent },
  { path: 'communications', component: CommunicationsComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    ConfigurationsComponent,
    SidenavComponent,
    CommunicationsComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpModule
  ],
  providers: [ConfigurationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
