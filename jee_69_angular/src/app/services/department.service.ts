import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartmentModel } from '../model/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {

  private departmentApi=environment.apiUrl+"department";

  constructor(
    private http: HttpClient
  ){}


  //get request
  
    getAllDep(): Observable<DepartmentModel[]>{
  
      return this.http.get<DepartmentModel[]>(this.departmentApi);
    }
  
    // post request
  
    save(dep : DepartmentModel){
  
      return this.http.post<DepartmentModel>(this.departmentApi,dep);
    }
  
  // put request
  
  update(dep : DepartmentModel):Observable<DepartmentModel>{
    return this.http.put<DepartmentModel>(this.departmentApi + '/' + dep.id, dep);
  }
  
  // delete student
  
  delete(id: string):Observable<void>{
    return this.http.delete<void>(this.departmentApi + '/' + id);
  }
  
  getById(id: string): Observable<DepartmentModel>{
  return this.http.get<DepartmentModel>(this.departmentApi + '/' + id);
  
  }

  
}
