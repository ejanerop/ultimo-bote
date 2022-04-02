import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';
import { MatchdayDialogComponent } from 'src/app/components/matchday-dialog/matchday-dialog.component';
import { MatchdayService } from 'src/app/services/matchday.service';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

@Component({
  selector: 'app-matchdays',
  templateUrl: './matchdays.component.html',
  styleUrls: ['./matchdays.component.scss'],
})
export class MatchdaysComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  players: any;
  displayedColumns: string[] = ['date', 'assist', 'actions'];
  constructor(
    private matchdayService: MatchdayService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.matchdayService
      .getMatchdays()
      .pipe(
        map((items: any) => {
          return items.map((item: any) => {
            return {
              id: item.id,
              dateTime: new Date(item.data().date.seconds * 1000),
              ...item.data(),
            };
          });
        })
      )
      .subscribe((data: any) => {
        console.log(data);

        this.dataSource = new MatTableDataSource(data);
      });
  }

  create() {
    const dialogRef = this.dialog.open(MatchdayDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((form) => {
      if (!form) {
        console.log('invalid');
        return;
      }
      this.matchdayService
        .createMatchday(form)
        .then((res) => {
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
        this.matchdayService
          .removeMatchday(element)
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
