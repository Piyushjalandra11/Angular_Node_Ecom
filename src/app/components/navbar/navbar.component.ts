import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../modules/cart/cart.service'; // Ensure correct path

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartCount: number = 0;
  isLoggedIn: boolean = false;

  constructor(public router: Router, private cartService: CartService) {}

  goToCart() {
    this.router.navigate(['/cart']); // ✅ Ye function router ko use karega
  }
  
  ngOnInit() {
    // Listen for cart updates
    this.cartService.getCartItems().subscribe((items) => {
      this.cartCount = items.length;
    });

    // Check if user is logged in
    this.isLoggedIn = !!localStorage.getItem('user');
  }

  logout() {
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.router.navigate(['/auth/login']);
  }
}
