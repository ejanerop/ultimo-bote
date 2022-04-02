import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  constructor(
    private matchdayService: MatchdayService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  create() {
    const dialogRef = this.dialog.open(MatchdayDialogComponent);

    dialogRef.afterClosed().subscribe((form) => {
      if (!form || form.invalid) {
        return;
      }

      this.matchdayService
        .createMatchday(form.value)
        .then((res) => {
          Toast.fire({
            icon: 'success',
            title: 'Added successfully',
          });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          Toast.fire({
            icon: 'error',
            title: 'There was an error',
          });
        });
    });
  }
}