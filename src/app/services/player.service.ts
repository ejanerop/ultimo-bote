import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionSnapshots,
} from '@angular/fire/firestore';

interface Item {
  name: string;
  nick: string;
  profile_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(private firestore: Firestore) {}

  getPlayers() {
    let data: any = collection(this.firestore, 'players');
    let items = collectionSnapshots(data);

    return items;
  }
}
