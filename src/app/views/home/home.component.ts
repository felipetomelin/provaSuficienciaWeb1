import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/Employee';
import { EmployeeDetail } from 'src/app/models/EmployeeDetail';
import { EmployeeService } from 'src/app/services/employee.service';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';

// const ELEMENT_DATA: Employee[] = [
//   {id: 1 ,employee_name: 'Hydrogen', salary: "1.0079", age: '70'},
//   {id: 2 ,name: 'Helium', salary: "4.0026", age: '68'},
//   {id: 3 ,name: 'Lithium', salary: "6.941", age: '59'},
//   {id: 4 ,name: 'Beryllium', salary: "9.0122", age: '11'},
//   {id: 5 ,name: 'Boron', salary: "10.811", age: '12'},
//   {id: 6 ,name: 'Carbon', salary: "12.0107", age: '13'},
//   {id: 7 ,name: 'Nitrogen', salary: "14.0067", age: '15'},
//   {id: 8 ,name: 'Oxygen', salary: "15.9994", age: '17'},
//   {id: 9 ,name: 'Fluorine', salary: "18.9984", age: '19'},
//   {id: 10 ,name: 'Neon', salary: "20.1797", age: '18'},
// ];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [EmployeeService]
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['id' ,'name', 'salary', 'age', 'actions'];
  dataSource!: Employee[];
  employees!: EmployeeDetail[];


  constructor(
    public dialog: MatDialog,
    public employeeService: EmployeeService
    ) {
      this.employeeService.getEmployees()
      .subscribe((data: EmployeeDetail[]) => {
        this.dataSource = data;
      })
     }

  ngOnInit(): void {
  }

  openDialog(element: Employee | null): void{
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data: element === null ? {
        name: '',
        salary: '',
        age: ''
      } : {
        name: element.employee_name,
        salary: element.employee_salary,
        age: element.employee_age
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        if(this.employees.map(x => x.id).includes(result.id)){
          this.employeeService.editEmployee(result, result.id).subscribe((data: Employee) => {
            const index = this.employees.findIndex(x => x.id === data.id);
            this.dataSource[result.id - 1] = data;
            this.table.renderRows();
          })
        }else {
          this.employeeService.createEmployee(result).subscribe((data: Employee) => {
            this.employees.push(result);
            this.table.renderRows();
          });
        }
      }
    });
  }

  updateEmployee(element: Employee): void{
    this.openDialog(element);
  }

  deleteEmployee(id: number): void{
    this.employeeService.deleteEmployee(id).subscribe(() => {
    this.dataSource = this.dataSource.filter(x => x.id !== id)
    })
  }

}
