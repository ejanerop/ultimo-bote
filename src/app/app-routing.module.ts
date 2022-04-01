import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatchdaysComponent } from './pages/matchdays/matchdays.component';
import { PlayerManagementComponent } from './pages/player-management/player-management.component';
import { PlayersComponent } from './pages/players/players.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'players', component: PlayersComponent },
  { path: 'player_management', component: PlayerManagementComponent },
  { path: 'matchdays', component: MatchdaysComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
