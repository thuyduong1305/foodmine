import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PassWordsMatchValidator } from '../../../shared/validators/password_match_validator';
import { IUserRegister } from '../../../shared/interfaces/IUserRegister';
import { TextInputComponent } from '../../partials/text-input/text-input.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, TextInputComponent, RouterModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', Validators.required],
        address: ['', [Validators.required, Validators.minLength(10)]],
      },
      {
        validators: PassWordsMatchValidator('password', 'confirmPassword'),
      }
    );
    this.returnUrl = this.activateRoute.snapshot.queryParams['returnUrl'];
  }

  get fc() {
    return this.registerForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const fv = this.registerForm.value;
    const user: IUserRegister = this.registerForm.value;

    this.userService.register(user).subscribe((_) => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}
