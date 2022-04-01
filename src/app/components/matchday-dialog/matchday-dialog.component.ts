import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-matchday-dialog',
  templateUrl: './matchday-dialog.component.html',
  styleUrls: ['./matchday-dialog.component.scss'],
})
export class MatchdayDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  constructor(
    public dialogRef: MatDialogRef<MatchdayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder
  ) {
    this.form = fb.group({
      date: data?.date || new Date(),
    });
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
