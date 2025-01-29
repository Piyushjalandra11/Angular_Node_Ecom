import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common'; // Import this to check if we're in the browser

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart = new BehaviorSubject<any[]>(this.getCartFromLocalStorage());
  cart$ = this.cart.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  // Get Cart from localStorage
  private getCartFromLocalStorage(): any[] {
    if (isPlatformBrowser(this.platformId)) {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    }
    return []; // Return empty array if not in the browser
  }

  // Save Cart to localStorage
  private saveCartToLocalStorage(cart: any[]) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  // Get All Cart Items
  getCartItems() {
    return this.cart$;
  }

  // Add to Cart
  addToCart(product: any) {
    let cart = this.getCartFromLocalStorage();
    cart.push(product);
    this.saveCartToLocalStorage(cart);
    this.cart.next(cart); // Notify subscribers
  }

  // Remove from Cart
  removeFromCart(productId: number) {
    let cart = this.getCartFromLocalStorage();
    cart = cart.filter((item) => item.id !== productId);
    this.saveCartToLocalStorage(cart);
    this.cart.next(cart); // Notify subscribers
  }

  // Clear Cart
  clearCart() {
    this.saveCartToLocalStorage([]);
    this.cart.next([]); // Notify subscribers
  }
}
