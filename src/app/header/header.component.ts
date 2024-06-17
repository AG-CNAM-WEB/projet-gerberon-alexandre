import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PanierState, PanierStateModel } from '../store/panier.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // Déclarez une propriété pour stocker le nombre d'articles dans le panier
  nombreArticlesPanier: number = 0;

  // Utilisez @Select pour injecter l'état du panier dans le composant
  @Select(PanierState)
  panier$!: Observable<PanierStateModel>;

  constructor() { }

  ngOnInit(): void {
    // Abonnez-vous à l'observable panier$ pour mettre à jour le nombre d'articles
    this.panier$.subscribe(panier => {
      this.nombreArticlesPanier = panier.items.length;
    });
  }
}
