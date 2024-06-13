import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpServiceService {

  constructor(private _http: HttpClient) { }

  addEmployee(data:any) : Observable<any>{
    return this._http.post('http://localhost:3000/employees',data); // this will return observable
  }
  updateEmployee(id:number,data:any) : Observable<any>{
    return this._http.put(`http://localhost:3000/employees/${id}`,data);
  }
  getEmployeesList() : Observable<any>{
    return this._http.get('http://localhost:3000/employees'); // this will get employees list from json server
  }
  deleteEmployee(id:number) : Observable<any>{
    return this._http.delete(`http://localhost:3000/employees/${id}`);
  }

}
