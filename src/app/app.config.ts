import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch,withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { JwtInterceptor } from '../core/interceptors/tokenInterceptor'
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { MenuOutline, UserOutline, LockOutline } from '@ant-design/icons-angular/icons';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
const icons = [MenuOutline, UserOutline, LockOutline];

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
 
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: JwtInterceptor,  // 指定你的拦截器类
      multi: true  // 允许多个拦截器并存
    },
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideNzIcons(icons) 
  ]
};
