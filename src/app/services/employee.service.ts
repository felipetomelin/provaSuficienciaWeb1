import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from "../models/Employee";
import { EmployeeDetail } from "../models/EmployeeDetail";

@Injectable()
export class EmployeeService{
    EmployeeApiUrl = 'http://dummy.restapiexample.com/api/v1'
    constructor(private http: HttpClient){}

    getEmployees(): Observable<EmployeeDetail[]>{
        return this.http.get<EmployeeDetail[]>(this.EmployeeApiUrl + '/employees');
    }

    getEmployeeById(id:number): Observable<Employee[]>{
        return this.http.get<Employee[]>(this.EmployeeApiUrl + `/employees/${id}`);
    }

    createEmployee(element: Employee): Observable<Employee>{
        return this.http.post<Employee>(this.EmployeeApiUrl + '/create', element);
    }

    editEmployee(element: Employee, id: number): Observable<Employee>{
        return this.http.put<Employee>(this.EmployeeApiUrl + `/update/${id}`, element)
    }

    deleteEmployee(id: number): Observable<any>{
        return this.http.delete<any>(this.EmployeeApiUrl + `delete/${id}`)
    }

}
