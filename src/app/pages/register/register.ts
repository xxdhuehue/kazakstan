import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService, UserCredentials } from '../../services/auth';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
 
export interface Response<T> {
  data: T
  message: string
  statuscode: string
}

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
 

  hasNoEmail = signal(false)
  isSubmitted = signal(false);

  applyForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('',[
      Validators.minLength(6),
      Validators.pattern(/^[a-zA-Z0-9]+$/) 
    ]),
    phone: new FormControl(''),
    email: new FormControl('', [
      Validators.email
    ])
  })

  changeToInputPhone(){
    this.hasNoEmail.set(true)
  }


  submitRegister() {
    this.isSubmitted.set(true)
    Object.values(this.applyForm.controls).forEach(control => {
      control.markAsTouched(); // 标记控件为"已触碰"，触发提示显示
    });
    if (this.applyForm.valid) {
      console.log('表单提交成功：', this.applyForm.value);
      this.authService.register(this.applyForm.value as UserCredentials).subscribe((data: any) => {
        if (data.data) {
          this.router.navigate(['/login'])
        }
      })
    } else {
      console.log('表单校验失败');
    }
  }
}
