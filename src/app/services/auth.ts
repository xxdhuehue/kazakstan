import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable,PLATFORM_ID } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common'; 
import { APP_TOKENS } from '../app.constants';
export interface UserCredentials {
  username: string;
  password: string;
  email?: string
  phone?: string
}

export interface AuthResponse {
  token: string;
  expiresIn?: number;  
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private tokenKey = APP_TOKENS.TOKEN;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object ){
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  register(credentials: UserCredentials): Observable<void> {
    return this.http.post<void>('/api/register', credentials)
  }

  login(credentials: UserCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/login', credentials)
  }

  getToken(): string | null | undefined {
    if (this.isBrowser) {
      return localStorage.getItem(this.tokenKey);
    }
    return null
  }

  // 退出登录（清除Token）
  logout(): void  {
    if (this.isBrowser) {
      localStorage.removeItem(this.tokenKey);
    }
    return 
  }

  // 检查是否登录
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
