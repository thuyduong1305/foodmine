import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { IUserLogin } from '../../../shared/interfaces/IUserLogin';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent implements OnInit {
  errorMessageForEmail = '';
  errorMessageForPassword = '';
  returnUrl: string = '';
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
      ),
    ]),
  });
  constructor(
    private userService: UserService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.loginForm.get('password')?.valueChanges.subscribe(() => {
      this.updateErrorMessages();
    });

    this.loginForm.get('email')?.valueChanges.subscribe(() => {
      this.updateErrorMessages();
    });

    this.returnUrl = this.activateRoute.snapshot.queryParams['returnUrl'];
  }
  updateErrorMessages() {
    const passwordErrors = this.loginForm.get('password')?.errors;
    if (passwordErrors?.['required']) {
      this.errorMessageForPassword = 'Password is required.';
    } else if (passwordErrors?.['minlength']) {
      this.errorMessageForPassword = 'password must be at least 8 character.';
    } else if (passwordErrors?.['pattern']) {
      this.errorMessageForPassword = `Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, 
        one special character, no space, and it must be 8 - 16 characters long`;
    } else {
      this.errorMessageForPassword = '';
    }

    const emailErrors = this.loginForm.get('email')?.errors;
    if (emailErrors?.['required']) {
      this.errorMessageForEmail = 'Email is required.';
    } else if (emailErrors?.['email']) {
      this.errorMessageForEmail = 'Invalid email format.';
    } else {
      this.errorMessageForEmail = '';
    }
  }
  submitUser() {
    if (this.loginForm.valid) {
      const userLogin: IUserLogin = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      };
      // console.log(userLogin.password, userLogin.email);
      this.userService.login(userLogin).subscribe(() => {
        this.router.navigateByUrl(this.returnUrl);
      });
    } else {
      this.updateErrorMessages();
    }
  }
}
