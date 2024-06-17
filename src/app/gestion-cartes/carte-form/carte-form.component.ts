// carte-form.component.ts
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarteService } from '../carte.service'

@Component({
  selector: 'app-carte-form',
  templateUrl: './carte-form.component.html',
  styleUrls: ['./carte-form.component.css']
})
export class CarteFormComponent {
  carteForm: FormGroup;

  constructor(private fb: FormBuilder, private carteService: CarteService) {
    this.carteForm = this.fb.group({
      nom: ['', Validators.required],
      code: ['', Validators.required],
      ccv: ['', Validators.required],
      mois: ['', Validators.required],
      annee: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.carteForm.valid) {
      const carte = this.carteForm.value;
      this.carteService.addCarte(carte);
      this.carteForm.reset();
    } else {
      this.carteForm.markAllAsTouched();
    }
  }

  // Fonction pour marquer tous les champs comme "touchés"
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}
