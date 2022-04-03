import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { provideStorage, getStorage } from '@angular/fire/storage';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NavigationComponent } from './navigation/navigation.component';
import { PlayersComponent } from './pages/players/players.component';
import { PlayerManagementComponent } from './pages/player-management/player-management.component';
import { PlayerComponent } from './components/player/player.component';
import { PlayerDialogContent } from './components/player-dialog/player-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerDetailsComponent } from './components/player-details/player-details.component';
import { HttpClientModule } from '@angular/common/http';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { MatchdaysComponent } from './pages/matchdays/matchdays.component';
import { MatchdayDialogComponent } from './components/matchday-dialog/matchday-dialog.component';
import { MaterialModule } from './material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { KeeperSelectComponent } from './pages/keeper-select/keeper-select.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavigationComponent,
    PlayersComponent,
    PlayerManagementComponent,
    PlayerComponent,
    PlayerDialogContent,
    PlayerDetailsComponent,
    CapitalizePipe,
    WeatherForecastComponent,
    MatchdaysComponent,
    MatchdayDialogComponent,
    ConfirmDialogComponent,
    KeeperSelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
    LayoutModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
