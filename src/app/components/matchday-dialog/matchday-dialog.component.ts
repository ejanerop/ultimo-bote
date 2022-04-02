import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
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
  selector: 'app-matchday-dialog',
  templateUrl: './matchday-dialog.component.html',
  styleUrls: ['./matchday-dialog.component.scss'],
})
export class MatchdayDialogComponent implements OnInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  players: any = [];
  loading: boolean = false;
  form: FormGroup = new FormGroup({});
  columns: string[] = ['name', 'assisted', 'goals', 'assists'];

  constructor(
    public dialogRef: MatDialogRef<MatchdayDialogComponent>,
    private playerService: PlayerService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder
  ) {
    this.form = fb.group({
      date: [data?.date || new Date(), [Validators.required]],
      assistance: this.fb.array(
        [],
        [Validators.required, Validators.minLength(5)]
      ),
      goals: this.fb.array([]),
      assists: this.fb.array([]),
    });
    this.loading = true;
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
        this.players = data;
        this.loading = false;
        this.dataSource = new MatTableDataSource(data);
      });
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log(this.form);
      Toast.fire({
        icon: 'error',
        title: 'Revisa los campos',
      });
      return;
    }
    console.log(this.form.value);

    this.dialogRef.close(this.form.value);
  }

  log() {
    console.log(this.form.value);
  }

  onAssistanceChange(event: any) {
    const assistance = this.form.get('assistance') as FormArray;
    const goals = this.form.get('goals') as FormArray;
    const assists = this.form.get('assists') as FormArray;
    if (event.checked) {
      assistance.push(this.fb.control(event.source.value));
      goals.push(
        this.fb.group({
          player: event.source.value,
          goals: [
            0,
            [Validators.required, Validators.min(0), Validators.max(10)],
          ],
        })
      );
      assists.push(
        this.fb.group({
          player: event.source.value,
          assists: [
            0,
            [Validators.required, Validators.min(0), Validators.max(10)],
          ],
        })
      );
    } else {
      assistance.removeAt(assistance.value.indexOf(event.source.value));
      goals.removeAt(
        goals.value.findIndex((item: any) => item.player === event.source.value)
      );
      assists.removeAt(
        assists.value.findIndex(
          (item: any) => item.player === event.source.value
        )
      );
    }
  }

  disabled(player_id: string) {
    const assistance = this.form.get('assistance') as FormArray;
    return !assistance.value.includes(player_id);
  }

  goalControl(player_id: string): number {
    const goals = this.form.get('goals') as FormArray;
    return goals.controls.findIndex(
      (item: any) => item.value.player === player_id
    );
  }

  onGoalChange(player_id: string, event: any) {
    const goals = this.form.get('goals') as FormArray;
    const index = this.goalControl(player_id);
    goals.controls[index].get('goals')?.setValue(event.target.value as number);
  }

  onAssistChange(player_id: string, event: any) {
    const assists = this.form.get('assists') as FormArray;
    const index = this.goalControl(player_id);
    assists.controls[index]
      .get('assists')
      ?.setValue(event.target.value as number);
  }
}
