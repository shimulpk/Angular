import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order, Style } from '../../shared/model';
import { Buyer } from '../buyer/buyer';
import { OrderService } from '../../core/services/order-service';
import { BuyerService } from '../../core/services/buyer-service';
import { StyleService } from '../../core/services/style-service';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-component.html',
  styleUrl: './order-component.css',
})
export class OrderComponent implements OnInit {

  orders: Order[] = [];
  allOrders: Order[] = [];

  buyers: Buyer[] = [];
  styles: Style[] = [];

  searchText: string = '';

  order: Order = {
    poNumber: '',
    buyerId: '',
    styleId: '',
    quantity: 0,
    unitPrice: 0,
    shipmentDate: '',
    status: ''
  };

  isEditMode: boolean = false;

  constructor(
    private orderService: OrderService,
    private buyerService: BuyerService,
    private styleService: StyleService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.getAllOrders();
    this.getAllBuyers();
    this.getAllStyles();
    this.cdr.detectChanges();

  }

  // GET ORDERS
  getAllOrders(): void {

    this.orderService.getAllOrders().subscribe({
      next: (res: Order[]) => {

        this.orders = res.map(order => {

          const buyer = this.buyers.find(
            b => b.id === order.buyerId
          );

          const style = this.styles.find(
            s => s.id === order.styleId
          );

          return {
            ...order,
            buyerName: buyer?.companyName || '',
            styleName: style?.styleCode || ''
          };

        });

        this.allOrders = this.orders;

        this.cdr.detectChanges();

      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  // GET BUYERS
  getAllBuyers(): void {

    this.buyerService.getAllBuyers().subscribe({
      next: (res: Buyer[]) => {
        this.buyers = res;
        this.cdr.detectChanges();
      }
    });

  }

  // GET STYLES
  getAllStyles(): void {

  this.styleService.getAllStyles().subscribe({
    next: (res: Style[]) => {

      this.styles = res;

      // AFTER STYLES & BUYERS LOADED
      this.getAllOrders();

      this.cdr.detectChanges();
    }
  });

}

  // SAVE OR UPDATE
  saveOrder(): void {

    if (this.isEditMode && this.order.id) {

      this.orderService
        .updateOrder(this.order.id, this.order)
        .subscribe({
          next: () => {

            alert('Order Updated Successfully');

            this.getAllOrders();
            this.resetForm();

          }
        });

    } else {

      this.orderService
        .addOrder(this.order)
        .subscribe({
          next: () => {

            alert('Order Added Successfully');

            this.getAllOrders();
            this.resetForm();

          }
        });

    }

  }

  // EDIT
  editOrder(data: Order): void {

    this.order = { ...data };

    this.isEditMode = true;

  }

  // DELETE
  deleteOrder(id: string): void {

    if (confirm('Are you sure to delete?')) {

      this.orderService.deleteOrder(id).subscribe({
        next: () => {

          alert('Order Deleted Successfully');

          this.getAllOrders();

        }
      });

    }

  }

  // SEARCH
  searchOrder(): void {

    const text = this.searchText.toLowerCase();

    this.orders = this.allOrders.filter((item) =>

      item.poNumber.toLowerCase().includes(text) ||
      item.status.toLowerCase().includes(text)

    );

  }

  // RESET
  resetForm(): void {

    this.order = {
      poNumber: '',
      buyerId: '',
      styleId: '',
      quantity: 0,
      unitPrice: 0,
      shipmentDate: '',
      status: ''
    };

    this.isEditMode = false;

  }

}