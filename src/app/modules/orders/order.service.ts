import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  placeOrder(orderDetails: any): Observable<any> {
    console.log('Order placed', orderDetails);
    // Dummy response with orderId
    const response = { orderId: 'ORD' + Math.floor(Math.random() * 1000000) };
    return of(response);
  }
}