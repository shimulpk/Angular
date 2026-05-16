// header-component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {

  loggedUser: any;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loadUser();

  }

  // LOAD USER
  loadUser(): void {

    const userData =
      localStorage.getItem('user');

    if (userData) {

      this.loggedUser =
        JSON.parse(userData);

    }

  }

  // CHECK ROLE
  hasRole(
    roles: string[]
  ): boolean {

    return roles.includes(
      this.loggedUser?.role
    );

  }

  // LOGOUT
  logout(): void {

    localStorage.removeItem('user');

    this.loggedUser = null;

    this.router.navigate(
      ['/login']
    );

  }

}