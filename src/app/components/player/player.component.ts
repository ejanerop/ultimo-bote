import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlayerDetailsComponent } from '../player-details/player-details.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  @Input() player: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  details(player: any) {
    console.log(player);
    this.dialog.open(PlayerDetailsComponent, { data: player });
  }

  overall() {
    let sum =
      this.player.pace +
      this.player.shooting +
      this.player.passing +
      this.player.dribbling +
      this.player.physique +
      this.player.defending;
    return Math.round(sum / 6);
  }
}
