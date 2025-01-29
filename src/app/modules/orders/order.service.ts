import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  placeOrder(orderDetails: any) {
    // For now, we'll just log the order details.
    console.log('Order placed:', orderDetails);
  }
}
