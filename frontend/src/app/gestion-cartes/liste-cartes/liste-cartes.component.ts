import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CarteService } from '../carte.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-liste-cartes',
  templateUrl: './liste-cartes.component.html',
  styleUrls: ['./liste-cartes.component.css']
})
export class ListeCartesComponent implements OnInit {
  @Output() carteSelectionnee = new EventEmitter<any>();
  cartes$: Observable<any[]>;
  carteSelectionneeLocal: any = null;

  constructor(private carteService: CarteService) {
    this.cartes$ = this.carteService.getCartes();
  }

  ngOnInit(): void {}

  selectionnerCarte(carte: any): void {
    this.carteSelectionneeLocal = carte;
    this.carteSelectionnee.emit(carte);
  }
}
