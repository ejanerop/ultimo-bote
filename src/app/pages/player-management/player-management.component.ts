import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { PlayerDialogContent } from 'src/app/components/player-dialog/player-dialog.component';
import { PlayerService } from 'src/app/services/player.service';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

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

    dialogRef.afterClosed().subscribe((form) => {
      if (!form || form.invalid) {
        return;
      }

      this.playerService
        .editPlayer(form.value)
        .then((res) => {
          Toast.fire({
            icon: 'success',
            title: 'Edited successfully',
          });
        })
        .catch((err) => {
          Toast.fire({
            icon: 'error',
            title: 'There was an error',
          });
        });
    });
  }

  create() {
    const dialogRef = this.dialog.open(PlayerDialogContent);

    dialogRef.afterClosed().subscribe((form) => {
      if (!form || form.invalid) {
        return;
      }

      this.playerService
        .createPlayer(form.value)
        .then((res) => {
          console.log(res);

          Toast.fire({
            icon: 'success',
            title: 'Added successfully',
          });
        })
        .catch((err) => {
          Toast.fire({
            icon: 'error',
            title: 'There was an error',
          });
        });
    });
  }

  remove(element: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.playerService
          .removePlayer(element)
          .then((res) => {
            Toast.fire({
              icon: 'success',
              title: 'Removed successfully',
            });
          })
          .catch((err) => {
            Toast.fire({
              icon: 'error',
              title: 'There was an error',
            });
          });
      }
    });
  }
}
