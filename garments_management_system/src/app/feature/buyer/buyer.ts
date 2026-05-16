import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BuyerService } from '../../core/services/buyer-service';




export interface Buyer {
  id?: string;
  buyerCode: string;
  companyName: string;
  country: string;
  currency: string;
  paymentTerm: string;
  status: boolean;
  
  
}

@Component({
  selector: 'app-buyer',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './buyer.html',
  styleUrl: './buyer.css',
})
export class BuyerComponent implements OnInit {

  buyers: Buyer[] = [];
  
  searchText: string = '';
 allBuyers: Buyer[] = [];


  buyer: Buyer = {
    buyerCode: '',
    companyName: '',
    country: '',
    currency: '',
    paymentTerm: '',
    status: true
  };

  isEditMode: boolean = false;

  constructor(private buyerService: BuyerService,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getAllBuyers();
    this.cdr.detectChanges();
  }

  // GET ALL
  getAllBuyers(): void {

    this.buyerService.getAllBuyers().subscribe({
      next: (res: Buyer[]) => {
        this.buyers = res;
        this.allBuyers= res;
       this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  
  // SAVE OR UPDATE
  saveBuyer(): void {

    if (this.isEditMode && this.buyer.id) {

      this.buyerService
        .updateBuyer(this.buyer.id, this.buyer)
        .subscribe({
          next: () => {
            alert('Buyer Updated Successfully');
            this.getAllBuyers();
            this.resetForm();
          },
        });

    } else {

      this.buyerService
        .addBuyer(this.buyer)
        .subscribe({
          next: () => {
            alert('Buyer Added Successfully');
            this.getAllBuyers();
            this.resetForm();
          },
        });

    }
  }

  // EDIT
  editBuyer(data: Buyer): void {

    this.buyer = { ...data };
    this.isEditMode = true;

  }

  // DELETE
  deleteBuyer(id: string): void {

    if (confirm('Are you sure to delete?')) {

      this.buyerService.deleteBuyer(id).subscribe({
        next: () => {
          alert('Buyer Deleted Successfully');
          this.getAllBuyers();
        },
      });

    }
  }

  // RESET FORM
  resetForm(): void {

    this.buyer = {
      buyerCode: '',
      companyName: '',
      country: '',
      currency: '',
      paymentTerm: '',
      status: true
      
    };
      
    this.isEditMode = false;
    

  }

  searchBuyer(): void {

  const text = this.searchText.toLowerCase();

  this.buyers = this.allBuyers.filter((item) =>

    item.companyName.toLowerCase().includes(text) ||
    item.buyerCode.toLowerCase().includes(text) ||
    item.country.toLowerCase().includes(text)

  );

}


}