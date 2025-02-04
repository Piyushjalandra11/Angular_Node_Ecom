import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Order {
  orderId: string;
  total: number;
}

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css'
})
export class OrderConfirmationComponent {
  order: any;

  constructor( private router: Router){
    const navigation = this.router.getCurrentNavigation();
    this.order = (navigation?.extras?.state as { order?: Order })?.order || { orderId: 'N/A', total: 0 };
  }

  continueShopping(): void {
    this.router.navigate(['/products'])
  }
}
