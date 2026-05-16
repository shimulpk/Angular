// profile-production-manager.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-production-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-production-manager.html',
  styleUrl: './profile-production-manager.css',
})
export class ProfileProductionManager {

  loggedUser: any;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loadUserData();

  }

  // LOAD USER
  loadUserData(): void {

    const userData =
      localStorage.getItem('user');

    if (userData) {

      this.loggedUser =
        JSON.parse(userData);

      // ROLE CHECK
      if (
        this.loggedUser.role !==
        'Production_Manager'
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