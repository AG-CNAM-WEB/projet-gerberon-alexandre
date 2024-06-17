// panier.actions.ts
import { Action } from '@ngxs/store';
import { Produit } from './panier.state';

export class AjouterProduit {
  static readonly type = '[Panier] Ajouter produit';
  constructor(public produit: Produit) {}
}

export class SupprimerProduit {
  static readonly type = '[Panier] Supprimer produit';
  constructor(public produit: Produit) {}
}
