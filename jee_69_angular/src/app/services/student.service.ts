import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentModel } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {

  private baseapi: string="http://localhost:3000/students";

  constructor(private http: HttpClient){}

  //get request

  getAllStudents(): Observable<StudentModel[]>{

    return this.http.get<StudentModel[]>(this.baseapi);
  }

  // post request

  saveStudents(student : StudentModel){

    return this.http.post<StudentModel>(this.baseapi,student);
  }

// put request

updateStudents(student : StudentModel):Observable<StudentModel>{
  return this.http.put<StudentModel>(this.baseapi + '/' + student.id, student);
}

// delete student

deleteStudents(id: string):Observable<void>{
  return this.http.delete<void>(this.baseapi + '/' + id);
}

getById(id: string): Observable<StudentModel>{
return this.http.get<StudentModel>(this.baseapi + '/' + id);

}

}
