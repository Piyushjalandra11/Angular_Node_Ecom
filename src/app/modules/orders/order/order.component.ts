import { Component } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { OrderService } from '../order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  imports: [CommonModule]
})
export class OrderComponent {
  cartItems: any[] = [];
  total: number = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  placeOrder() {
    const orderDetails = {
      items: this.cartItems,
      total: this.total,
    };
    this.orderService.placeOrder(orderDetails);
    this.cartService.clearCart();
  }
}
