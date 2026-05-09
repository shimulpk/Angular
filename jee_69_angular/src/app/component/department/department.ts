import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DepartmentModel } from '../../model/department.model';
import { DepartmentService } from '../../services/department.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department',
  imports: [CommonModule,FormsModule],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department implements OnInit {

  departments:DepartmentModel[]=[]
  department:DepartmentModel={name: '', email: ''}

  isEdit =false

  constructor(
    private depService:DepartmentService,
    private cdr: ChangeDetectorRef

  ){}
  ngOnInit(): void {
   this.loadAllDep();
  }

  loadAllDep(){
    this.depService.getAllDep().subscribe(
      {
        next:(data) =>{
          this.departments=data;
          this.cdr.markForCheck();
          console.log(data);
        },
        error:(err) =>{
          console.log(err);
        }
      }
    );
  }
  
saveDepartment() {

    if (this.isEdit) {
      // UPDATE
      this.depService.update(this.department).subscribe({
        next: () => {
          this.resetForm();
          this.loadAllDep();
        },
        error: (err) => console.log(err)
      });
    } else {
      // CREATE
      this.depService.save(this.department).subscribe({
        next: () => {
          this.resetForm();
          this.loadAllDep();
        },
        error: (err) => console.log(err)
      });
    }
  }

   // 🔹 EDIT (SET DATA INTO FORM)
  editDepartment(dep: DepartmentModel) {
    this.department = { ...dep };
    this.isEdit = true;
  }

    // 🔹 DELETE
  deleteDepartment(id: string) {
    if (confirm('Are you sure to delete?')) {
      this.depService.delete(id).subscribe({
        next: () => this.loadAllDep(),
        error: (err) => console.log(err)
      });
    }
  }

    // 🔹 RESET FORM
  resetForm() {
    this.department = { id: '', name: '', email: '' };
   this.isEdit = false;
  }
  






}

  


