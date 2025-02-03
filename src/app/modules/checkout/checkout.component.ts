import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  imports: [ CommonModule ,FormsModule]
})
export class CheckoutComponent {
  checkoutData = {
    name: '',
    address: '',
    paymentMethod: 'cod'
  };

  constructor(private router: Router) {}

  placeOrder() {
    if (!this.checkoutData.name || !this.checkoutData.address) {
      alert('Please fill all details!');
      return;
    }

    // Order confirmation message
    alert('Order placed successfully!');
    
    // Redirect to order history page (baad me implement karenge)
    this.router.navigate(['/orders']);
  }
}
