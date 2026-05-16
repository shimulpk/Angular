import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-admin.html',
  styleUrl: './profile-admin.css',
})
export class ProfileAdmin {

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