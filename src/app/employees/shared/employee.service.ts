import { Injectable } from '@angular/core';
import { Employee } from "./employee.model";
import { AngularFireList } from 'angularfire2/database/interfaces';
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class EmployeeService {
  employeeList: AngularFireList<any>
  selectedEmployee: Employee = new Employee();
  constructor(private firebase: AngularFireDatabase) { }

  GetData() {
    this.employeeList = this.firebase.list('employees');
    return this.employeeList;
  }
  InsertEmployee(employee: Employee) {
    console.log(employee.name,employee.position)
    // this.employeeList.push({
    //   name: employee.name,
    //   position: employee.position,
    //   office: employee.office,
    //   salary: employee.salary
    // })
  }
  UpdateEmployee(employee: Employee) {
    this.employeeList.update(employee.$key, {
      name: employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary
    })
  }
  DeleteEmployee(key: string) {
    this.employeeList.remove(key)
  }

}
