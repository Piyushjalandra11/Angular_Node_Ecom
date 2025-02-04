import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule]
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  itemToRemove: number | null = null;
  showClearCartModal: boolean = false;
 

  constructor(private cartService: CartService , private router: Router) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe((items) => {
      const uniqueItems = new Map();
      items.forEach(item => {
        if (!uniqueItems.has(item.id)) {
          uniqueItems.set(item.id, { ...item, quantity: item.quantity || 1 });
        }
      });
      this.cartItems = Array.from(uniqueItems.values());
      this.calculateTotal();
    });
  }

  goToCheckout() {
    this.router.navigate(['/checkout']); 
  }

  confirmRemoveItem(productId: number){
    this.itemToRemove = productId;
  }

  removeFromCart(productId: number) {
    // this.cartService.removeFromCart(productId);
    if(productId !== null){
      this.cartService.removeFromCart(productId);
      this.cartItems = this.cartItems.filter(item => item.id !== productId);
      this.itemToRemove = null;
      this.calculateTotal();
    }
  }

  confirmClearCart(){
     this.showClearCartModal = true;
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.showClearCartModal = false;
    this.calculateTotal();
  }
  updateQuantity(index:number, change: number){
    if(this.cartItems[index].quantity + change >= 1){
      this.cartItems[index].quantity += change;
      this.cartService.updateCart(this.cartItems);
    }
  }

  saveCart(){
    localStorage.setItem('cart', JSON.stringify(this.cartItems))
    this.calculateTotal();
  }

  getTotalPrice(): number{
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0) 
  }
  
}
