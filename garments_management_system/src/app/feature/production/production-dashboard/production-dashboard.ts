import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ProductionStage {
  stageType: string;
  actualQty: number;
  efficiencyPercent: number;
}

export interface Production {
  id?: string;
  orderId: string;
  styleId: string;
  lineName: string;
  plannedStart: Date;
  completedEnd: Date;
  stages: ProductionStage[];
}

@Component({
  selector: 'app-production-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './production-dashboard.html',
  styleUrl: './production-dashboard.css',
})
export class ProductionDashboardComponent
  implements OnChanges {

    

  @Input() productions: Production[] = [];

  totalProductionQty: number = 0;

  averageEfficiency: number = 0;

  totalLines: number = 0;

  totalStages: number = 0;

  ngOnChanges(): void {

    this.calculateDashboard();

  }

  // BUSINESS LOGIC
  calculateDashboard(): void {

    let qty = 0;
    let efficiency = 0;
    let stageCount = 0;

    this.totalLines = this.productions.length;

    this.productions.forEach((production) => {

      production.stages.forEach((stage) => {

        qty += Number(stage.actualQty);

        efficiency +=
          Number(stage.efficiencyPercent);

        stageCount++;

      });

    });

    this.totalProductionQty = qty;

    this.totalStages = stageCount;

    this.averageEfficiency =
      stageCount > 0
        ? efficiency / stageCount
        : 0;

  }

}