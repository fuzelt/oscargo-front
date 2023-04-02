import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseServiceService {

  constructor(private firestore: Firestore) { }

  
  getPlaces(): Observable<any[]> {
    const placeRef = collection(this.firestore, 'positions');
    return collectionData(placeRef, { idField: 'id' }) as Observable<any[]>;
  }

}
