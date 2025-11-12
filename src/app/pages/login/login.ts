import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService, UserCredentials } from '../../services/auth';
import { Router } from '@angular/router';
import { APP_TOKENS } from '../../app.constants';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private authService: AuthService, private router: Router){}
  applyForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('')
  })

  submitApplication(){
    if (this.applyForm.valid) {
      this.authService.login(this.applyForm.value as UserCredentials).subscribe((data: any) => {
        if (data.data) {
          localStorage.setItem(APP_TOKENS.TOKEN, data.data.token);
          localStorage.setItem(APP_TOKENS.USERINFO, JSON.stringify(data.data.userInfo))
          this.router.navigateByUrl("/")
        }
      })
    } else {
      this.applyForm.markAllAsTouched()
    }
  }
  get firstName() { return this.applyForm.get('firstName'); }
  get lastName() { return this.applyForm.get('lastName'); }
  get email() { return this.applyForm.get('email'); }
}
