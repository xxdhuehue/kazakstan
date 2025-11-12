import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../app/services/auth'
import { Router } from '@angular/router';

@Injectable() 
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
 
    // 1. 获取当前令牌，添加到请求头
    const token = this.authService.getToken();
 
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` } // 固定格式：Bearer + 空格 + 令牌
      });
    }

    // 2. 处理响应错误：401时跳转登录页
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout(); // 清除无效令牌
          this.router.navigate(['/login']); // 跳转登录页
        }
        return throwError(() => new Error(error.message || '请求失败，请重试'));
      })
    );
  }
}