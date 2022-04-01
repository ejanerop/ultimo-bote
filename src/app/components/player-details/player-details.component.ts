import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chart, ChartItem, registerables } from 'chart.js';

@Component({
  selector: 'app-player-details',
  templateUrl: './player-details.component.html',
  styleUrls: ['./player-details.component.scss'],
})
export class PlayerDetailsComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public player: any) {
    Chart.register(...registerables);
    Chart.defaults.font.size = 18;
  }

  ngOnInit(): void {
    const canvas = <HTMLCanvasElement>document.getElementById('myChart');
    const ctx = <ChartItem>canvas.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['DISP', 'REG', 'FIS', 'DEF', 'PAS', 'VEL'],
        datasets: [
          {
            label: `${this.player.name} stats`,
            data: [
              this.player.pace,
              this.player.dribbling,
              this.player.physique,
              this.player.defending,
              this.player.passing,
              this.player.pace,
            ],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 3,
            pointBorderWidth: 5,
          },
        ],
      },
      options: {
        scales: {
          r: {
            angleLines: {
              display: false,
            },
            ticks: {
              display: false,
            },
            suggestedMin: 50,
            suggestedMax: 100,
          },
        },
      },
    });
  }
}
