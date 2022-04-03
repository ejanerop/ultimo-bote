import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-keeper-select',
  templateUrl: './keeper-select.component.html',
  styleUrls: ['./keeper-select.component.scss'],
})
export class KeeperSelectComponent implements OnInit {
  players: any;
  loading: boolean = false;
  selected: boolean = false;
  team: any = [];

  constructor(private playerService: PlayerService, private storage: Storage) {
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
        this.dataSource = new MatTableDataSource(data);
      });
  }

  ngOnInit(): void {}

  displayedColumns: string[] = ['select', 'name'];
  dataSource = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  select(row: any) {
    this.selection.toggle(row);
    console.log("You've selected a players");

    if (this.selection.selected.length === 4) {
      console.log("You've selected 4 players");
      this.dataSource.data = this.dataSource.data.filter((item) => {
        return this.selection.selected.some((selected) => {
          return selected.id === item.id;
        });
      });
    } else {
      this.dataSource = new MatTableDataSource(this.players);
    }
  }

  setOrder() {
    this.selected = true;
    this.loading = true;

    let players = this.selection.selected;
    // shuffle player order
    this.team = players
      .sort(() => Math.random() - 0.5)
      .map((item: any) => {
        let reference: any;
        if (!item.profile_url) {
          reference = ref(this.storage, 'default-player.svg');
        } else {
          reference = ref(this.storage, item.profile_url);
        }
        item.profile_url = getDownloadURL(reference);
        return item;
      });
    this.loading = false;
  }
}
