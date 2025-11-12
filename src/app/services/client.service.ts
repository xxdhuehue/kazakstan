import { isPlatformBrowser } from "@angular/common";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { catchError, Observable, of, tap, throwError } from "rxjs";

export enum REQUEST_METHOD {
    POST = 'POST',
    GET = "GET"
}

@Injectable({providedIn: 'root'})
export class ClientService {

    private baseUrl = "http://localhost:4200"
    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object
    ){}

    getClienData(url: string, requestMethod: string, postParams?: any):Observable<any> {
        if (!isPlatformBrowser(this.platformId)) {
            return of(null)
        }
        if (requestMethod === REQUEST_METHOD.GET) {
            return this.http.get(`${this.baseUrl}${url}`).pipe(
                catchError((error) => this.handleError(error, url))
            )
        } else if (requestMethod === REQUEST_METHOD.POST) {
            return this.http.post(`${this.baseUrl}${url}`, postParams).pipe(
                catchError((error) => this.handleError(error, url))
            )
        } else {
            return of(null)
        }
    }

    private handleError(error: HttpErrorResponse, url: string): Observable<any> {
        let errorMessage = '请求失败，请稍后重试';
    
        // 1. 区分客户端错误（如网络问题）和服务器错误
        if (error.error instanceof ErrorEvent) {
          // 客户端错误（如网络断开）
          errorMessage = `客户端错误：${error.error.message}`;
        } else {
          // 服务器错误（根据状态码处理）
          switch (error.status) {
            case 403: // 权限不足
              errorMessage = '没有权限执行此操作';
              break;
            case 404: // 资源不存在
              errorMessage = `请求的资源不存在（${url}）`;
              break;
            case 500: // 服务器内部错误
              errorMessage = '服务器繁忙，请稍后重试';
              // 可选：上报错误到监控系统
             
              break;
            default:
              errorMessage = `服务器错误（${error.status}）：${error.error?.message || errorMessage}`;
          }
        }
        // 2. 向用户展示错误（通过提示服务）
        // this.toast.error(errorMessage);

        return throwError(() => new Error(errorMessage));
      }
}