import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { PlayerDialogContent } from 'src/app/components/player-dialog/player-dialog.component';
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
  displayedColumns: string[] = ['position', 'name', 'nick', 'actions'];
  constructor(private playerService: PlayerService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.playerService
      .getPlayers()
      .pipe(
        map((items: any) => {
          return items.map((item: any) => {
            return { id: item.id, ...item.data() };
          });
        })
      )
      .subscribe((data: any) => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  edit(element: any) {
    console.log(element);

    const dialogRef = this.dialog.open(PlayerDialogContent, { data: element });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
