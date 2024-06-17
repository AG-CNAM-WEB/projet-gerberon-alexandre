// gestion-cartes.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CarteFormComponent } from './carte-form/carte-form.component';
import { ListeCartesComponent } from './liste-cartes/liste-cartes.component';
import { CarteService } from './carte.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MaskedNumberPipe } from './masked-number.pipe';

@NgModule({
  declarations: [CarteFormComponent, ListeCartesComponent, MaskedNumberPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CarteService],
  exports: [CarteFormComponent, ListeCartesComponent]
})
export class GestionCartesModule { }
