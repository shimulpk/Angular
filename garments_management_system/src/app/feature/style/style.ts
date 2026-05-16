import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Style } from '../../shared/model';
import { StyleService } from '../../core/services/style-service';



@Component({
  selector: 'app-style',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './style.html',
  styleUrl: './style.css',
})
export class StyleComponent implements OnInit {

  styles: Style[] = [];

  allStyles: Style[] = [];

  searchText: string = '';

  style: Style = {
    styleCode: '',
    buyerId: '',
    garmentType: '',
    gender: '',
    season: '',
    sampleApproved: false
  };

  isEditMode: boolean = false;

  constructor(private styleService: StyleService,private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getAllStyles();
    this.cdr.detectChanges();
  }

  // GET ALL
  getAllStyles(): void {

    this.styleService.getAllStyles().subscribe({
      next: (res: Style[]) => {

        this.styles = res;
        this.allStyles = res;
        this.cdr.detectChanges();

      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  // SAVE OR UPDATE
  saveStyle(): void {

    if (this.isEditMode && this.style.id) {

      this.styleService
        .updateStyle(this.style.id, this.style)
        .subscribe({
          next: () => {

            alert('Style Updated Successfully');

            this.getAllStyles();
            this.resetForm();

          }
        });

    } else {

      this.styleService
        .addStyle(this.style)
        .subscribe({
          next: () => {

            alert('Style Added Successfully');

            this.getAllStyles();
            this.resetForm();

          }
        });

    }

  }

  // EDIT
  editStyle(data: Style): void {

    this.style = { ...data };

    this.isEditMode = true;

  }

  // DELETE
  deleteStyle(id: string): void {

    if (confirm('Are you sure to delete?')) {

      this.styleService.deleteStyle(id).subscribe({
        next: () => {

          alert('Style Deleted Successfully');

          this.getAllStyles();

        }
      });

    }

  }

  // SEARCH
  searchStyle(): void {

    const text = this.searchText.toLowerCase();

    this.styles = this.allStyles.filter((item) =>

      item.styleCode.toLowerCase().includes(text) ||
      item.garmentType.toLowerCase().includes(text) ||
      item.season.toLowerCase().includes(text)

    );

  }

  // RESET FORM
  resetForm(): void {

    this.style = {
      styleCode: '',
      buyerId: '',
      garmentType: '',
      gender: '',
      season: '',
      sampleApproved: false
    };

    this.isEditMode = false;

  }

}