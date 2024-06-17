import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Store } from '@ngxs/store';
import { AjouterProduit } from '../store/panier.actions';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  
  constructor(
    private productService: ProductService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data.products;
      this.filteredProducts = this.products; // Initialisez les produits filtrés avec tous les produits au début
    });
  }

  onSearch(criteria: any): void {
    console.log('Received Search Criteria:', criteria);
    this.filteredProducts = this.filterProducts(criteria);
  }

  ajouterAuPanier(product: any): void {
    const produitPanier = {
      nom: product.name,
      prix: product.price
    };
    this.store.dispatch(new AjouterProduit(produitPanier));
  }

  private filterProducts(criteria: any): any[] {
    // Logique de filtrage
    return this.products.filter(product =>
      (criteria.year === null || product.year === criteria.year) &&
      (criteria.brand === null || product.brand.toLowerCase().includes(criteria.brand.toLowerCase())) &&
      (criteria.model === null || product.model.toLowerCase().includes(criteria.model.toLowerCase())) &&
      (criteria.minPrice === null || product.price >= criteria.minPrice) &&
      (criteria.maxPrice === null || product.price <= criteria.maxPrice)
    );
  }
}
