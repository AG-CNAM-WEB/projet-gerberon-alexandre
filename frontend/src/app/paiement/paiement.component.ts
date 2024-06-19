// paiement.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarteService } from '../gestion-cartes/carte.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  paiementEffectue: boolean = false;
  constructor(private router: Router, private carteService: CarteService) {}

  ngOnInit(): void {}

  onPaiementEffectue(): void {
    // Logique de paiement (simulé)
    console.log('Paiement effectué avec succès!');
    this.paiementEffectue = true;
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
  }
}
