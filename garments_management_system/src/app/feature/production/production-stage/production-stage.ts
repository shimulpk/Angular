import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductionService } from '../../../core/services/production-service';
import { Production } from '../production-dashboard/production-dashboard';

export interface ProductionStage {
  id?: string;
  stageType: string;
  actualQty: number;
  efficiencyPercent: number;
}

@Component({
  selector: 'app-production-stage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './production-stage.html',
  styleUrl: './production-stage.css',
})
export class ProductionStageComponent {
  // প্রোডাকশন সার্ভিস ইনজেক্ট করুন
constructor(private productionService: ProductionService) {}

  @Input() stages: ProductionStage[] = [];

  @Output() stagesChange =
    new EventEmitter<ProductionStage[]>();

  stage: ProductionStage = {
    stageType: '',
    actualQty: 0,
    efficiencyPercent: 0
  };

  // // ADD STAGE
  // addStage(): void {

  //   if (
  //     this.stage.stageType &&
  //     this.stage.actualQty > 0
  //   ) {

  //     this.stages.push({
  //       ...this.stage
  //     });

  //     this.stagesChange.emit(this.stages);

  //     this.resetStage();

  //   }

  // }

  addStage(): void {
  if (this.stage.stageType && this.stage.actualQty > 0) {
    
    // ১. একটি অবজেক্ট তৈরি করুন যা db.json এ যাবে
    const newProductionEntry: Production = {
      orderId: "ORD-101", 
      styleId: "STL-202",
      lineName: "Line-A",
      plannedStart: new Date(),
      completedEnd: new Date(),
      stages: [{ ...this.stage }] // বর্তমান স্টেজটি অ্যারেতে ভরে দিন
    };

    // ২. সার্ভিস ব্যবহার করে ডাটাবেসে সেভ করুন
    this.productionService.addProduction(newProductionEntry).subscribe({
      next: (res) => {
        alert('Data saved to db.json successfully!');
        this.resetStage();
        // ৩. আপনি যদি ওই পেজেই টেবিল দেখান তবে ডাটা রিফ্রেশ করুন
        this.stages.push(res.stages[0]); 
      },
      error: (err) => alert('Error: JSON Server is not running!')
    });
  }
}

  // REMOVE STAGE
  removeStage(index: number): void {

    this.stages.splice(index, 1);

    this.stagesChange.emit(this.stages);

  }

  // RESET
  resetStage(): void {

    this.stage = {
      stageType: '',
      actualQty: 0,
      efficiencyPercent: 0
    };

  }

  // TOTAL QTY
  getTotalQty(): number {

    return this.stages.reduce(
      (sum, item) =>
        sum + Number(item.actualQty),
      0
    );

  }

  // AVERAGE EFFICIENCY
  getAverageEfficiency(): number {

    if (this.stages.length === 0) {
      return 0;
    }

    const total =
      this.stages.reduce(
        (sum, item) =>
          sum + Number(item.efficiencyPercent),
        0
      );

    return total / this.stages.length;

  }

}