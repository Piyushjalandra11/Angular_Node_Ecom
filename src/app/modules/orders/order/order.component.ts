import { Component } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
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
    private orderService: OrderService,
    private router: Router  // Inject Router
  ) {
    this.cartService.getCartItems().subscribe((items: any[]) => {
      // Ensure items is defined, if not, use an empty array.
      this.cartItems = items || [];
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    // Explicitly define the types to avoid "possibly undefined" issues.
    this.total = this.cartItems.reduce((sum: number, item: any) => sum + item.price, 0);
  }

  placeOrder(): void {
    const orderDetails = {
      items: this.cartItems,
      total: this.total,
    };

    // Now that placeOrder returns an Observable, we can subscribe to it.
    this.orderService.placeOrder(orderDetails).subscribe(
      (response: any) => {
        // Order placed successfully, navigate to order confirmation page
        this.router.navigate(['/order-confirmation'], { state: { order: response } });
        this.cartService.clearCart();
      },
      (error: any) => {
        // Handle error if needed
        alert('Order placement failed. Please try again.');
      }
    );
  }
}
