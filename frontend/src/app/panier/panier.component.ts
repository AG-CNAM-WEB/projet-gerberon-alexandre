// panier.component.ts
import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PanierState, PanierStateModel, Produit } from '../store/panier.state';
import { SupprimerProduit, PayerPanier } from '../store/panier.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  @Select(PanierState)
  panier$!: Observable<PanierStateModel>;

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
  }

  supprimerProduit(produit: Produit) {
    this.store.dispatch(new SupprimerProduit(produit));
  }

  payerPanier() {
    // Redirection vers la page de confirmation de paiement
    this.router.navigate(['/paiement']);
  }

  // Vérifier si le panier n'est pas vide
  isPanierNonVide(panier: Produit[]): boolean {
    return panier.length > 0;
  }
}
