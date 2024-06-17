// carte.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarteService {
  private cartes: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() { }

  getCartes(): Observable<any[]> {
    return this.cartes.asObservable();
  }

  addCarte(carte: any): void {
    const currentCartes = this.cartes.value;
    const newCartes = [...currentCartes, carte];
    this.cartes.next(newCartes);
  }
}
