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
export class MatchdayDialogComponent {
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
    console.log(data);

    this.initForm();
    this.loadPlayers();
  }

  initForm() {
    this.form = this.fb.group({
      id: this.data?.id || '',
      date: [this.data?.dateTime || new Date(), [Validators.required]],
      assistance: this.fb.array(
        [],
        [Validators.required, Validators.minLength(5)]
      ),
      goals: this.fb.array([]),
      assists: this.fb.array([]),
    });

    if (this.data?.assistance) {
      this.data.assistance.forEach((player: any) => {
        this.assistance.push(this.fb.control(player));
        this.goals.push(this.playerGroup('goals', player));
        this.assists.push(this.playerGroup('assists', player));
      });
    }
    if (this.data?.goals) {
      this.data.goals.forEach((player: any) => {
        this.goals.controls
          .find((item: any) => item.value.player === player.player)
          ?.get('goals')
          ?.setValue(player.goals);
      });
      if (this.data?.assists) {
        this.data.assists.forEach((player: any) => {
          this.assists.controls
            .find((item: any) => item.value.player === player.player)
            ?.get('assists')
            ?.setValue(player.assists);
        });
      }
    }
  }

  loadPlayers() {
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

  get goals() {
    return this.form.get('goals') as FormArray;
  }

  get assistance() {
    return this.form.get('assistance') as FormArray;
  }

  get assists() {
    return this.form.get('assists') as FormArray;
  }

  playerGroup(control: string, player_id: string) {
    return this.fb.group({
      player: player_id,
      [control]: [
        0,
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
    });
  }

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
    const assistance = this.assistance;
    const goals = this.goals;
    const assists = this.assists;
    if (event.checked) {
      assistance.push(this.fb.control(event.source.value));
      goals.push(this.playerGroup('goals', event.source.value));
      assists.push(this.playerGroup('assists', event.source.value));
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
    return !this.assistance.value.includes(player_id);
  }

  goalControl(player_id: string): number {
    return this.goals.controls.findIndex(
      (item: any) => item.value.player === player_id
    );
  }

  onGoalChange(player_id: string, event: any) {
    const index = this.goalControl(player_id);
    this.goals.controls[index]
      .get('goals')
      ?.setValue(event.target.value as number);
  }

  onAssistChange(player_id: string, event: any) {
    const index = this.goalControl(player_id);
    this.assists.controls[index]
      .get('assists')
      ?.setValue(event.target.value as number);
  }

  goalsOf(player_id: string) {
    const index = this.goalControl(player_id);
    return this.goals.controls[index]?.get('goals')?.value as number;
  }

  assistsOf(player_id: string) {
    const index = this.goalControl(player_id);
    return this.assists.controls[index]?.get('assists')?.value as number;
  }
}
