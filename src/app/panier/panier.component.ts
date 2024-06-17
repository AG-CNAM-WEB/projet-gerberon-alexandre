// panier.component.ts
import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PanierState, PanierStateModel, Produit } from '../store/panier.state';
import { SupprimerProduit } from '../store/panier.actions';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  @Select(PanierState)
  panier$!: Observable<PanierStateModel>;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  supprimerProduit(produit: Produit) {
    this.store.dispatch(new SupprimerProduit(produit));
  }
}
