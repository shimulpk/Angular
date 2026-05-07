import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudentModel } from '../../../model/student.model';
import { StudentService } from '../../../services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-student',
  imports: [CommonModule],
  templateUrl: './list-student.html',
  styleUrl: './list-student.css',
})
export class ListStudent implements OnInit{

  students : StudentModel[]=[];

  constructor(
    private studentService: StudentService,
    private cdr: ChangeDetectorRef

  ){}
  ngOnInit(): void {
   this.loadAllStudent();
   console.log(this.students);
  }

loadAllStudent(){

  this.studentService.getAllStudents().subscribe(
{

  next: (data) => {

    this.students=data;
    this.cdr.detectChanges();
    console.log(this.students);
  },

  error: (err) => {
    console.log(err);
  }
}

  );

}

remove(id: string){
this.studentService.deleteStudents(id).subscribe(

  {
    next: () =>{
  console.log("Success");
  this.loadAllStudent();
},

error: (err) =>{
  console.log("err");
},
  }

);
}

}
