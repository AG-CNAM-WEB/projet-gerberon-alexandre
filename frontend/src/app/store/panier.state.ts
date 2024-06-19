// panier.state.ts
import { State, Action, StateContext } from '@ngxs/store';
import { AjouterProduit, SupprimerProduit, PayerPanier, ViderPanier } from './panier.actions';
import { Injectable } from '@angular/core';

export interface Produit {
  nom: string;
  prix: number;
}

export interface PanierStateModel {
  items: Produit[];
}

@State<PanierStateModel>({
  name: 'panier',
  defaults: {
    items: []
  }
})
@Injectable()
export class PanierState {

  @Action(AjouterProduit)
  ajouterProduit(ctx: StateContext<PanierStateModel>, action: AjouterProduit) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      items: [...state.items, action.produit]
    });
  }

  @Action(SupprimerProduit)
  supprimerProduit(ctx: StateContext<PanierStateModel>, action: SupprimerProduit) {
    const state = ctx.getState();
    const produitIndex = state.items.findIndex(item => item.nom === action.produit.nom);
    if (produitIndex !== -1) {
      const nouveauxProduits = [...state.items];
      nouveauxProduits.splice(produitIndex, 1);
      ctx.setState({
        ...state,
        items: nouveauxProduits
      });
    }
  }

  @Action(PayerPanier)
  payerPanier(ctx: StateContext<PanierStateModel>) {
    // Simulation de paiement réussi
    console.log('Paiement effectué avec succès.');

    // Vider le panier
    ctx.dispatch(new ViderPanier());
  }

  @Action(ViderPanier)
  viderPanier(ctx: StateContext<PanierStateModel>) {
    ctx.setState({
      items: []
    });
  }
}
