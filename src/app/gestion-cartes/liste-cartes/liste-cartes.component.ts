// liste-cartes.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarteService } from '../carte.service';

@Component({
  selector: 'app-liste-cartes',
  templateUrl: './liste-cartes.component.html',
  styleUrls: ['./liste-cartes.component.css']
})
export class ListeCartesComponent implements OnInit {
  cartes$!: Observable<any[]>;

  constructor(private carteService: CarteService) {}

  ngOnInit(): void {
    this.cartes$ = this.carteService.getCartes();
  }
}
