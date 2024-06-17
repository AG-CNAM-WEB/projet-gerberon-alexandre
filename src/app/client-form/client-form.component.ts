import { Component, NgModule } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ClientFormModule {}

@Component({
    selector: 'app-client-form',
    templateUrl: './client-form.component.html',
    styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent {
  clientForm = this.formBuilder.group({
    prenom: ['', Validators.required],
    nom: ['', Validators.required],
    civilite: ['', Validators.required],
    address: this.formBuilder.group({
      rue: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      pays: ['', Validators.required],
    }),
    email: ['', Validators.required],
    phone: ['', Validators.required],
    login: ['', Validators.required],
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required],
  }, { validator: this.passwordMatchValidator });

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private authService: AuthService // Injectez le service AuthService
  ) {}

  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const passwordConfirm = formGroup.get('passwordConfirm')?.value;

    if (password !== passwordConfirm) {
      formGroup.get('passwordConfirm')?.setErrors({ passwordMismatch: true });
      return { 'passwordMismatch': true };
    }

    return null;
  }
  
  onSubmit() {
    console.warn(this.clientForm.value);
    this.authService.register(this.clientForm.value).subscribe({
      next: (response) => {
        console.log(response);
        window.location.href = '/login';
      },
      error: (error) => {
        console.error('Error submitting client data:', error);
      }
    });
  }

  updateProfile() {
    this.clientForm.patchValue({
      nom: 'Nouveau nom',
      prenom: 'Nouveau prenom',
      civilite: '',
      address: {
        rue: 'Nouvelle rue',
        codePostal: 'Nouveau code postal',
        ville: 'Nouvelle ville',
        pays: 'Nouveau pays'
      },
      email: 'Nouveau email',
      phone: 'Nouveau téléphone',
      login: 'Nouveau login',
      password: 'Nouveau mot de passe',
    });
  }
}
