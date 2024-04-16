import { Component } from '@angular/core';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {Order} from "../../models/order.model";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-all-orders',
  standalone: true,
    imports: [
        CurrencyPipe,
        DatePipe,
        NgForOf,
        NgIf
    ],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent {

  orders: Order[];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe((orders: Order[]) => {
      this.orders = orders;
    });
  }

  calculateTotal(products: any[]): number {
    let total = 0;
    for (const product of products) {
      total += product.price;
    }
    return total;
  }

}
