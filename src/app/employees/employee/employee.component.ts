import { Component, OnInit } from '@angular/core';
import { EmployeeService } from "../shared/employee.service";
import { NgForm, Validator } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeservice: EmployeeService) { }

  ngOnInit() {
    this.ResetForm();
  }


  OnSubmit(form: NgForm) {
    if (form.value.$key == null) {
      this.employeeservice.InsertEmployee(form.value);
      return false;
    }
    else {
      this.employeeservice.UpdateEmployee(form.value);
      console.log(form.value.$key)
    }
    this.ResetForm(form);
  }

  ResetForm(form?: NgForm) {
    if (form != null) { form.reset(); }
    this.employeeservice.selectedEmployee = {
      name: '',
      position: '',
      salary: 0,
      $key: '',
      office: ''
    }
  }

  DeleteEmployee(form: NgForm) {
    if (confirm("Are you sure you want to delete?") == true) {
      this.employeeservice.DeleteEmployee(form.value.$key)
      this.ResetForm();
    }
  }

}
