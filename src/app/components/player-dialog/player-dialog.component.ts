import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSliderChange } from '@angular/material/slider';

const SKILLS = [
  { name: 'pace', label: 'Velocidad' },
  { name: 'shooting', label: 'Disparo' },
  { name: 'passing', label: 'Pase' },
  { name: 'dribbling', label: 'Regate' },
  { name: 'physique', label: 'Físico' },
  { name: 'defending', label: 'Defensa' },
];

@Component({
  selector: 'app-player-dialog-content',
  templateUrl: 'player-dialog-content.html',
  styleUrls: ['./player-dialog-content.scss'],
})
export class PlayerDialogContent {
  form: FormGroup = new FormGroup({});
  skills = SKILLS;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder
  ) {
    this.form = fb.group({
      id: data?.id || '',
      name: [data?.name || '', Validators.required],
      nick: [data?.nick || ''],
      pace: data?.pace || 0,
      shooting: data?.shooting || 0,
      passing: data?.passing || 0,
      dribbling: data?.dribbling || 0,
      physique: data?.physique || 0,
      defending: data?.defending || 0,
    });
  }

  formatLabel(value: number) {
    return value;
  }

  onSkillChange(skill: string, $event: MatSliderChange) {
    this.form.get(skill)?.setValue($event.value);
  }
}
