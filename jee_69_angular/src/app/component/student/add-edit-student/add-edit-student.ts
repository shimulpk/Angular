import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudentModel } from '../../../model/student.model';
import { StudentService } from '../../../services/student.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-edit-student',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-edit-student.html',
  styleUrl: './add-edit-student.css',
})
export class AddEditStudent implements OnInit{

  student: StudentModel={name: '', email: '', cell: '', fee: 0};
  isEditMode = false;

constructor(
  private studentService:StudentService,
  private router:Router,
  private activeRoute:ActivatedRoute,
  private cdr:ChangeDetectorRef
){}
  ngOnInit(): void {
   const id=this.activeRoute.snapshot.paramMap.get('id');
   if(id){
    this.isEditMode=true;
    this.studentService.getById(id).subscribe(
      {
        next: (data) =>{
          this.student=data;
          this.cdr.markForCheck();
          
        },

        
       
          error: (err) => {
            console.log(err);
          }

      }

    );

    
   }
  }



  save(){

    if(this.isEditMode){
      this.studentService.updateStudents(this.student).subscribe(

        {

          next: () =>{
            console.log("Data update");
           this.goBack();
          },

          error: (err)=>{
            console.log(err);
          }
        }
      );
    }

    else{

      this.studentService.saveStudents(this.student).subscribe(

        {

          next: () =>{
            console.log("Data save");
           this.goBack();
          },

          error: (err)=>{
            console.log(err);
          }
        }
      );
    }
  }

  goBack(){
    this.router.navigate(['/all_stu']);
  }

}
