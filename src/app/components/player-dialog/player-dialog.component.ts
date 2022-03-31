import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-player-dialog-content',
  templateUrl: 'player-dialog-content.html',
  styleUrls: ['./player-dialog-content.scss'],
})
export class PlayerDialogContent {
  form: FormGroup = new FormGroup({});
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder
  ) {
    this.form = fb.group({
      name: [data?.name || '', Validators.required],
      nick: [data?.nick || ''],
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
