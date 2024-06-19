// paiement.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarteService } from '../gestion-cartes/carte.service';
import { PayerPanier } from '../store/panier.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  paiementEffectue: boolean = false;
  cartes: any[] = [];
  carteSelectionnee: any = null;
  constructor(private router: Router, private carteService: CarteService, private store: Store) { }

  ngOnInit(): void {
    this.carteService.getCartes().subscribe(cartes => {
      this.cartes = cartes;
    });
  }

  onPaiementEffectue(): void {
    // Logique de paiement (simulé)
    if (this.cartes.length > 0 && this.carteSelectionnee) {
      console.log('Paiement effectué avec succès!');
      this.paiementEffectue = true;
      this.store.dispatch(new PayerPanier());
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 3000);
    } else {
      console.log('Impossible de valider le paiement : aucune carte sélectionnée');
    }
  }
  selectionnerCarte(carte: any): void {
    this.carteSelectionnee = carte;
  }
}
