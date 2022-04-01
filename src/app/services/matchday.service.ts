import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionSnapshots,
  doc,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class MatchdayService {
  constructor(private firestore: Firestore) {}

  getMatchdays() {
    let data: any = collection(this.firestore, 'matchdays');
    let items = collectionSnapshots(data);

    return items;
  }

  createMatchday(item: any) {
    let data: any = collection(this.firestore, 'matchdays');
    console.log(data);
    return new Promise((resolve, reject) => {
      resolve(item);
    });
    //return addDoc(data, item);
  }

  editMatchday(matchday: any) {
    let db: any = collection(this.firestore, 'matchdays');
    const { id, ...data } = matchday;
    return setDoc(doc(this.firestore, 'matchdays', id), data, { merge: true });
  }
}
