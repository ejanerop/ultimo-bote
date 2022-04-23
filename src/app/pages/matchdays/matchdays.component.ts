import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
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
  encapsulation: ViewEncapsulation.None,
})
export class MatchdaysComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  players: any;
  displayedColumns: string[] = ['date', 'assist', 'actions'];
  matchdays: Date[] = [];
  loading: boolean = false;
  @ViewChild(MatCalendar) calendar?: MatCalendar<Date>;

  dateFormat: (date: Date) => any = (date: Date) => {
    let selected = false;

    if (this.matchdays) {
      selected = this.matchdays.some(
        (item: Date) =>
          item.getFullYear() === date.getFullYear() &&
          item.getDate() === date.getDate() &&
          item.getMonth() === date.getMonth()
      );
    }

    return selected ? 'highlight-matchday' : undefined;
  };

  dateFilter = (date: Date) => {
    return this.matchdays.some((item: Date) => {
      return (
        item.getFullYear() === date.getFullYear() &&
        item.getDate() === date.getDate() &&
        item.getMonth() === date.getMonth()
      );
    });
  };

  constructor(
    private matchdayService: MatchdayService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.matchdayService.getMatchdays().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      if (data) {
        this.matchdays = data.map((matchday: any) => {
          console.log(matchday.dateTime instanceof Date);
          return matchday.dateTime;
        });
        console.log(this.matchdays);
      }
      this.loading = false;
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

  edit(matchday: any) {
    const dialogRef = this.dialog.open(MatchdayDialogComponent, {
      width: '600px',
      data: matchday,
    });

    dialogRef.afterClosed().subscribe((form) => {
      if (!form) {
        console.log('invalid');
        return;
      }
      this.matchdayService
        .editMatchday(form)
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

  onDateSelected(event: any) {
    console.log(event);
  }
}
