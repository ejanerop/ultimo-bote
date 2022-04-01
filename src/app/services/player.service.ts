import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionSnapshots,
  addDoc,
} from '@angular/fire/firestore';
import { doc, setDoc } from '@firebase/firestore';

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

  createPlayer(item: any) {
    let data: any = collection(this.firestore, 'players');
    return addDoc(data, item);
  }

  editPlayer(player: any) {
    let db: any = collection(this.firestore, 'players');
    const { id, ...data } = player;
    return setDoc(doc(this.firestore, 'players', id), data);
  }
}
