import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { PlayerDialogContent } from 'src/app/components/player-dialog/player-dialog.component';
import { PlayerService } from 'src/app/services/player.service';

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
    const dialogRef = this.dialog.open(PlayerDialogContent, { data: element });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  create() {
    const dialogRef = this.dialog.open(PlayerDialogContent);

    dialogRef.afterClosed().subscribe((form) => {
      if (form) {
        if (form.invalid) {
          return;
        }

        console.log(form);
      }
    });
  }
}
