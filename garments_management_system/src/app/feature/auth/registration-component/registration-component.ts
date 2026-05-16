// registration-component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule
} from '@angular/forms';

import { Router } from '@angular/router';
import { User } from '../../../shared/model';
import { AuthService } from '../../../core/services/auth-service';



@Component({
  selector: 'app-registration-component',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl:
    './registration-component.html',

  styleUrl:
    './registration-component.css',
})
export class RegistrationComponent {

  // FORM MODEL
  user: User = {

    name: '',
    email: '',
    password: '',
    phone: '',
    image: '',
    role: ''

  };

  // MESSAGE
  successMessage: string = '';
  errorMessage: string = '';

  // LOADING
  isLoading: boolean = false;

  constructor(

    private authService: AuthService,
    private router: Router

  ) {}


  // REGISTER USER
  onRegister(): void {

    // VALIDATION
    if (

      !this.user.name ||
      !this.user.email ||
      !this.user.password ||
      !this.user.phone ||
      !this.user.role

    ) {

      this.errorMessage =
        'Please fill all required fields';

      return;

    }

    this.isLoading = true;

    // CHECK EMAIL
    this.authService
      .getAll()
      .subscribe({

        next: (users: User[]) => {

          const existingUser =
            users.find(

              (u) =>
                u.email === this.user.email

            );

          // EMAIL EXISTS
          if (existingUser) {

            this.errorMessage =
              'Email already exists';

            this.isLoading = false;

            return;

          }

          // SAVE USER
          this.authService
            .save(this.user)
            .subscribe({

              next: () => {

                this.successMessage =
                  'Registration Successful';

                this.errorMessage = '';

                this.isLoading = false;

                // RESET FORM
                this.user = {

                  name: '',
                  email: '',
                  password: '',
                  phone: '',
                  image: '',
                  role: ''

                };

                // REDIRECT
                setTimeout(() => {

                  this.router.navigate(
                    ['/login']
                  );

                }, 1500);

              },

              error: () => {

                this.errorMessage =
                  'Registration Failed';

                this.isLoading = false;

              }

            });

        },

        error: () => {

          this.errorMessage =
            'Server Error';

          this.isLoading = false;

        }

      });

  }

}