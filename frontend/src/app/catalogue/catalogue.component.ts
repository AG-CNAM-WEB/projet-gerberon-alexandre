import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Store } from '@ngxs/store';
import { AjouterProduit } from '../store/panier.actions';
import { ActivatedRoute } from '@angular/router';

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
    private store: Store,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const searchQuery = params['search'];
      if (searchQuery) {
        this.productService.searchProducts(searchQuery).subscribe(data => {
          this.products = data.products;
          this.filteredProducts = this.products;
        });
      } else {
        this.productService.getProducts().subscribe(data => {
          this.products = data.products;
          this.filteredProducts = this.products;
        });
      }
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
