import { Component } from '@angular/core';
import { StudentModel } from '../../../model/student.model';
import { StudentService } from '../../../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-student',
  imports: [],
  templateUrl: './add-edit-student.html',
  styleUrl: './add-edit-student.css',
})
export class AddEditStudent {

  student: StudentModel={name: '', email: '', cell: '', fee: 0};
  isEditMode = false;

constructor(
  private studentService:StudentService,
  private router:Router
){}

  save(){

    if(this.isEditMode){
      this.studentService.updateStudents(this.student).subscribe(

        {

          next: () =>{
            console.log("Data Saved");
            this.router.navigate
          }
        }
      );
    }

    else{}
  }

}
