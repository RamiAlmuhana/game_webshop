import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthResponse } from '../auth-response.model';
import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";
import {SnackbarService} from "../../services/snackbar.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public maxLoginAttempts = 5;
  public loginAttempts = 0;
  public loginDisabled = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private _snackBar: MatSnackBar, private snackbarService: SnackbarService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required, Validators.maxLength(64), Validators.minLength(5)]],
      password: ['', [Validators.minLength(8), Validators.maxLength(128)]]
    });
  }

  public onSubmit(): void {
    if (this.loginDisabled) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      (authResponse: AuthResponse) => {
        console.log('AuthResponse: ', authResponse);
        this.snackbarService.openSnackBar('Welcome back!');
        this.messageService.add({ severity: 'success', summary: 'Login Success!', detail: 'Welcome back!' });
        this.router.navigate(['']);
      },
      error => {
        // Handle login error
        console.error('Login error: ', error);
        this.loginAttempts++;

        if (this.loginAttempts >= this.maxLoginAttempts) {
          console.log('Max login attempts reached. Login disabled.');
          this.snackbarService.openSnackBar('Max login attempts reached. Login disabled.');
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Max login attempts reached. Login disabled.' });
          this.loginDisabled = true;
        } else {
          this.snackbarService.openSnackBar('Invalid email or password. Please try again.');
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid email or password. Please try again.' });
        }
      }
    );
  }
}
