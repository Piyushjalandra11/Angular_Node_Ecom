import { CanActivate, Router } from '@angular/router';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: object) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      if (!user) {
        this.router.navigate(['/auth/login']);
        return false;
      }
      return true;
    }
    
    // SSR mode me user ko login page pe bhej do
    this.router.navigate(['/auth/login']);
    return false;
  }
}
