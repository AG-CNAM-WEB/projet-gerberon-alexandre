// profile.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileData: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getProfile()
      .subscribe(
        (user) => {
          this.profileData = user;
        },
        (error) => {
          console.error('Error fetching profile data:', error);
        }
      );
  }
}
