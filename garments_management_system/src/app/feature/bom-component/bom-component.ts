import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



import { Bom, Style } from '../../shared/model';
import { BomService } from '../../core/services/bom-service';
import { StyleService } from '../../core/services/style-service';

@Component({
  selector: 'app-bom',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bom-component.html',
  styleUrl: './bom-component.css',
})
export class BomComponent implements OnInit {

  boms: Bom[] = [];
  allBoms: Bom[] = [];

  styles: Style[] = [];

  searchText: string = '';

  totalConsumption: number = 0;
  totalWastage: number = 0;
  netConsumption: number = 0;

  bom: Bom = {
    id: '',
    styleId: '',
    materialName: '',
    category: '',
    consumption: 0,
    wastage: 0,
    uom: ''
  };

  isEditMode: boolean = false;

  constructor(
    private bomService: BomService,
    private styleService: StyleService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.getAllBom();
    this.getAllStyles();
    this.cdr.detectChanges();

  }

  // GET ALL BOM
  getAllBom(): void {

    this.bomService.getAllBom().subscribe({
      next: (res: Bom[]) => {

        this.boms = res;
        this.allBoms = res;

        this.calculateSummary();
         this.cdr.detectChanges();

      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  // GET ALL STYLES
  getAllStyles(): void {

    this.styleService.getAllStyles().subscribe({
      next: (res: Style[]) => {
        this.styles = res;
         this.cdr.detectChanges();
      }
    });

  }

  // SAVE OR UPDATE
  saveBom(): void {

    if (this.isEditMode && this.bom.id) {

      this.bomService
        .updateBom(this.bom.id, this.bom)
        .subscribe({
          next: () => {

            alert('BOM Updated Successfully');

            this.getAllBom();
            this.resetForm();

          }
        });

    } else {

      this.bomService
        .addBom(this.bom)
        .subscribe({
          next: () => {

            alert('BOM Added Successfully');

            this.getAllBom();
            this.resetForm();

          }
        });

    }

  }

  // EDIT
  editBom(data: Bom): void {

    this.bom = { ...data };

    this.isEditMode = true;

  }

  // DELETE
  deleteBom(id: string): void {

    if (confirm('Are you sure to delete?')) {

      this.bomService.deleteBom(id).subscribe({
        next: () => {

          alert('BOM Deleted Successfully');

          this.getAllBom();

        }
      });

    }

  }

  // SEARCH
  searchBom(): void {

    const text = this.searchText.toLowerCase();

    this.boms = this.allBoms.filter((item) =>

      item.materialName.toLowerCase().includes(text) ||
      item.category.toLowerCase().includes(text) ||
      item.uom.toLowerCase().includes(text)

    );

    this.calculateSummary();

  }

  // BUSINESS LOGIC
  calculateSummary(): void {

    this.totalConsumption = this.boms.reduce(
      (sum, item) => sum + Number(item.consumption),
      0
    );

    this.totalWastage = this.boms.reduce(
      (sum, item) => sum + Number(item.wastage),
      0
    );

    this.netConsumption =
      this.totalConsumption + this.totalWastage;

  }

  // RESET FORM
  resetForm(): void {

    this.bom = {
      id: '',
      styleId: '',
      materialName: '',
      category: '',
      consumption: 0,
      wastage: 0,
      uom: ''
    };

    this.isEditMode = false;

  }

}