import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PanierState, PanierStateModel } from '../store/panier.state';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

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

  isLoggedIn: boolean = false; // Ajoutez cette propriété

  constructor(private authService: AuthService, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    // Abonnez-vous à l'observable panier$ pour mettre à jour le nombre d'articles
    this.panier$.subscribe(panier => {
      this.nombreArticlesPanier = panier.items.length;
    });
    // Abonnez-vous à l'état de connexion
    this.authService.loggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  onSearch(query: string): void {
        this.router.navigate(['/catalogue'], { queryParams: { search: query } });
  }
}
