import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../modules/cart/cart.service'; // Ensure correct path
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartCount: number = 0;
  isLoggedIn: boolean = false;

  constructor(
    public router: Router, 
    private cartService: CartService, 
    @Inject(PLATFORM_ID) private platformId: object // Platform check karne ke liye inject karna zaroori hai
  ) {}

  goToCart() {
    this.router.navigate(['/cart']);
  }
  
  ngOnInit() {
    // Listen for cart updates
    this.cartService.getCartItems().subscribe((items) => {
      this.cartCount = items.length;
    });

    // Check if localStorage is available (Browser environment)
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn = !!localStorage.getItem('user');
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }
    this.isLoggedIn = false;
    this.router.navigate(['/auth/login']);
  }
}
