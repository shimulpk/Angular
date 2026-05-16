// login-component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService }
from '../../../core/services/auth-service';

import { User }
from '../../../shared/model';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {

  // LOGIN FORM
  loginData = {

    email: '',
    password: ''

  };

  // MESSAGE
  errorMessage: string = '';
  successMessage: string = '';

  // LOADING
  isLoading: boolean = false;

  constructor(

    private authService: AuthService,
    private router: Router

  ) {}

  // LOGIN
  onLogin(): void {

    // CLEAR OLD MESSAGE
    this.errorMessage = '';
    this.successMessage = '';

    // VALIDATION
    if (

      !this.loginData.email ||
      !this.loginData.password

    ) {

      this.errorMessage =
        'Please enter email and password';

      return;

    }

    this.isLoading = true;

    // GET USERS
    this.authService
      .getAll()
      .subscribe({

        next: (users: User[]) => {

          // FIND USER
          const user = users.find(

            (u) =>

              u.email ===
                this.loginData.email &&

              u.password ===
                this.loginData.password

          );

          // INVALID LOGIN
          if (!user) {

            this.errorMessage =
              'Invalid Email or Password';

            this.successMessage = '';

            this.isLoading = false;

            return;

          }

          // LOGIN SUCCESS
          this.authService.loginUser(user);

          this.successMessage =
            'Login Successful';

          this.errorMessage = '';

          this.isLoading = false;

          // DELAY REDIRECT
          setTimeout(() => {

            // ADMIN
            if (
              user.role === 'Admin'
            ) {

              this.router.navigate(
                ['/profile-admin']
              );

            }

            // MARCHANDISER
            else if (
              user.role ===
              'Marchandiser'
            ) {

              this.router.navigate(
                ['/profile-marchandiser']
              );

            }

            // PRODUCTION
            else if (
              user.role ===
              'Production_Manager'
            ) {

              this.router.navigate(
                ['/profile-production_manager']
              );

            }

            // QA
            else if (
              user.role ===
              'QA_Officer'
            ) {

              this.router.navigate(
                ['/qa-dashboard']
              );

            }

            // STORE
            else if (
              user.role ===
              'StoreKepper'
            ) {

              this.router.navigate(
                ['/store-dashboard']
              );

            }

            // DEFAULT
            else {

              this.router.navigate(
                ['/home']
              );

            }

          }, 1000);

        },

        error: () => {

          this.errorMessage =
            'Server Error';

          this.successMessage = '';

          this.isLoading = false;

        }

      });

  }

}