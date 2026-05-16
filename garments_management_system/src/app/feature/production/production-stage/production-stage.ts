import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { ProductionService } from '../../../core/services/production-service';
import { ProductionStageService } from '../../../core/services/productionStage-service';
import { OrderService } from '../../../core/services/order-service';

import { Order, Production, ProductionStage } from '../../../shared/model';

@Component({
  selector: 'app-production-stage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './production-stage.html',
  styleUrl: './production-stage.css',
})
export class ProductionStageComponent implements OnInit {

  production!: Production;
  stages: ProductionStage[] = [];

  productionId: string = 'x-xcoYK5eUE';

  selectedOrderId: string = '';

  completedOrders: Order[] = [];

  lines: string[] = [
    'Line-A',
    'Line-B',
    'Line-C',
    'Line-D',
    'Line-E'
  ];

  stageForm: ProductionStage = {
    productionId: '',
    stageType: 'Cutting',
    plannedQty: 0,
    actualQty: 0,
    efficiencyPercent: 0,
    status: 'Pending',
    orderId: ''
  };

  constructor(
    private productionService: ProductionService,
    private stageService: ProductionStageService,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadProductionData();
    this.loadCompletedOrders();
  }

  // 🔥 LOAD PRODUCTION + STAGES
  loadProductionData(): void {

    forkJoin({
      production: this.productionService.getById(this.productionId),
      stages: this.stageService.getByProductionId(this.productionId)
    }).subscribe({
      next: (res) => {

        this.production = res.production;
        this.stages = res.stages;

        this.selectedOrderId = this.production.orderId;

        this.cdr.detectChanges();
      },
      error: (err) => console.log(err)
    });

  }

  // 📦 LOAD COMPLETED ORDERS
  loadCompletedOrders(): void {

    this.orderService.getOrdersByStatus('Completed')
      .subscribe({
        next: (res) => {
          this.completedOrders = res;
        },
        error: (err) => console.log(err)
      });

  }

  // 🔄 ORDER CHANGE (ONLY UI UPDATE)
  onOrderChange(): void {

    if (!this.production) return;

    this.production.orderId = this.selectedOrderId;

    this.cdr.detectChanges();

  }

  // ➕ ADD STAGE
  addStage(): void {

    this.stageForm.productionId = this.productionId;
    this.stageForm.orderId = this.selectedOrderId;

    this.stageService.addStage(this.stageForm)
      .subscribe({
        next: () => {

          alert('Stage Added Successfully');

          this.resetStageForm();
          this.loadProductionData();

        },
        error: (err) => console.log(err)
      });

  }

  // ✏️ UPDATE STAGE
  updateStage(stage: ProductionStage): void {

    this.stageService.updateStage(stage.id!, stage)
      .subscribe({
        next: () => {

          alert('Stage Updated');

          this.loadProductionData();

        },
        error: (err) => console.log(err)
      });

  }

  // 🔄 RESET
  resetStageForm(): void {

    this.stageForm = {
      productionId: '',
      stageType: 'Cutting',
      plannedQty: 0,
      actualQty: 0,
      efficiencyPercent: 0,
      status: 'Pending'
    };

  }
}