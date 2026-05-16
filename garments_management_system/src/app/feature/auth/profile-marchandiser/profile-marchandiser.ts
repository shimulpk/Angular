// profile-marchandiser.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-marchandiser',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-marchandiser.html',
  styleUrl: './profile-marchandiser.css',
})
export class ProfileMarchandiser {

  loggedUser: any;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loadUserData();

  }

  // LOAD USER DATA
  loadUserData(): void {

    const userData =
      localStorage.getItem('user');

    if (userData) {

      this.loggedUser =
        JSON.parse(userData);

      // ROLE CHECK
      if (
        this.loggedUser.role !==
        'Marchandiser'
      ) {

        this.router.navigate(
          ['/login']
        );

      }

    }

    else {

      this.router.navigate(
        ['/login']
      );

    }

  }

  // LOGOUT
  logout(): void {

    localStorage.removeItem('user');

    this.router.navigate(
      ['/login']
    );

  }

}