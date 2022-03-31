import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatTableDataSource } from '@angular/material/table';
import { PlayerService } from 'src/app/services/player.service';

export interface PeriodicElement {
  name: string;
  position: number;
  nick: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', nick: 'asd' },
  { position: 2, name: 'Helium', nick: 'as' },
  { position: 3, name: 'Lithium', nick: 'asd' },
  { position: 4, name: 'Beryllium', nick: 'ad' },
  { position: 5, name: 'Boron', nick: 'asd' },
  { position: 6, name: 'Carbon', nick: 'asd' },
  { position: 7, name: 'Nitrogen', nick: 'asd' },
  { position: 8, name: 'Oxygen', nick: 'asd' },
  { position: 9, name: 'Fluorine', nick: 'asd' },
  { position: 10, name: 'Neon', nick: 'asd' },
];

@Component({
  selector: 'app-player-management',
  templateUrl: './player-management.component.html',
  styleUrls: ['./player-management.component.scss'],
})
export class PlayerManagementComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  players: any;
  displayedColumns: string[] = ['position', 'name', 'nick'];
  constructor(private playerService: PlayerService) {}

  ngOnInit(): void {
    this.players = this.playerService.getPlayers();
    this.players.subscribe((data: any) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });
    console.log(this.players);
  }
}
