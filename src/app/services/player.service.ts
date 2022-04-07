import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionSnapshots,
  addDoc,
  deleteDoc,
  getDocs,
} from '@angular/fire/firestore';
import { doc, query, setDoc, where } from '@firebase/firestore';
import { map } from 'rxjs';

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
    let db: any = collection(this.firestore, 'players');
    const { id, ...data } = item;

    return addDoc(db, data);
  }

  editPlayer(player: any) {
    const { id, ...data } = player;
    return setDoc(doc(this.firestore, 'players', id), data, { merge: true });
  }

  removePlayer(player: any) {
    return deleteDoc(doc(this.firestore, 'players', player.id));
  }

  getPlayerInfo(id: string) {
    let records: any = collection(this.firestore, 'matchdays');

    let q = query(records, where('assistance', 'array-contains', id));

    return collectionSnapshots(q).pipe(
      map((data: any) => {
        return data.map((item: any) => {
          return {
            id: item.id,
            ...item.data(),
          };
        });
      })
    );
  }
}
