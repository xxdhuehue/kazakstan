import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

export type PermissionType = "admin" | "vistor"
export type Role = ""

@Injectable({
  providedIn: 'root',
})
export class Permission {
    private userPermission$$ = new BehaviorSubject<PermissionType[]>([])
    userPermission$ = this.userPermission$$.asObservable()

    constructor(private http: HttpClient) {}

    fetchUserPermissions(): Observable<PermissionType[]> {
      return this.http.get<{ permissions: PermissionType[] }>('/api/user/permissions').pipe(
        map(res => res.permissions),
        tap(permissions => this.userPermission$$.next(permissions))
      );
    }
  
    // 校验用户是否拥有目标权限（支持单个或多个权限，满足其一即可）
    hasPermission(requiredPermissions: PermissionType[]): boolean {
      const userPermissions = this.userPermission$$.value;
      return requiredPermissions.some(perm => userPermissions.includes(perm));
    }
}
