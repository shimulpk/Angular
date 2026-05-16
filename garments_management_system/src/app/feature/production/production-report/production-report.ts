import { Component, Input } from '@angular/core';
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
  selector: 'app-production-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './production-report.html',
  styleUrl: './production-report.css',
})
export class ProductionReportComponent {

  @Input() productions: Production[] = [];

  // TOTAL PRODUCTION
  getTotalProduction(
    stages: ProductionStage[]
  ): number {

    return stages.reduce(
      (sum, item) =>
        sum + Number(item.actualQty),
      0
    );

  }

  // AVERAGE EFFICIENCY
  getAverageEfficiency(
    stages: ProductionStage[]
  ): number {

    if (stages.length === 0) {
      return 0;
    }

    const total =
      stages.reduce(
        (sum, item) =>
          sum + Number(item.efficiencyPercent),
        0
      );

    return total / stages.length;

  }

  // PRODUCTION STATUS
  getProductionStatus(
    production: Production
  ): string {

    const today = new Date();

    const endDate =
      new Date(production.completedEnd);

    if (endDate < today) {
      return 'Completed';
    }

    return 'Running';

  }

}