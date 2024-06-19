import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileData: any;
  profileForm: FormGroup;
  updateSuccess: boolean = false;
  updateError: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.profileForm = this.formBuilder.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      civilite: ['', Validators.required],
      address: this.formBuilder.group({
        rue: ['', Validators.required],
        codePostal: ['', Validators.required],
        ville: ['', Validators.required],
        pays: ['', Validators.required],
      }),
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      login: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authService.getProfile()
      .subscribe(
        (user) => {
          this.profileData = user;
          this.profileForm.patchValue(user.user);
        },
        (error) => {
          console.error('Error fetching profile data:', error);
        }
      );
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.authService.updateProfile(this.profileForm.value).subscribe({
        next: (response) => {
          this.updateSuccess = true;
          setTimeout(() => {
            this.updateSuccess = false;
            this.router.navigate(['/']);
          }, 3000);
        },
        error: (error) => {
          this.updateError = true;
          console.error('Error updating profile data:', error);
        }
      });
    }
  }
}
