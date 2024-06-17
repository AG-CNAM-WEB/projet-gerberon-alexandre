import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientFormComponent } from './client-form/client-form.component';
import { ProfileComponent } from './profile/profile.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { CarteFormComponent } from './gestion-cartes/carte-form/carte-form.component';
import { PanierComponent } from './panier/panier.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'form', component: ClientFormComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'catalogue', component: CatalogueComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'carte', component: CarteFormComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: CatalogueComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
