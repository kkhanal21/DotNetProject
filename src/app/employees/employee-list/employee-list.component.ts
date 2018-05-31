import { Component, OnInit } from '@angular/core';
import { AngularFireList } from "angularfire2/database";
import {  EmployeeService} from "../shared/employee.service";
import {  Employee} from "../shared/employee.model";
import { element } from 'protractor';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employeeservice:EmployeeService) { }
employeelist:Employee[]
  ngOnInit() {

   var x= this.employeeservice.GetData();
   x.snapshotChanges().subscribe(item=>{
           this.employeelist=[];
           item.forEach(element=>{
             var y=element.payload.toJSON();
             y["$key"]=element.key;
             this.employeelist.push(y as Employee)
           })
   })
  }
  onItemClick(emp:Employee){
 this.employeeservice.selectedEmployee=Object.assign({},emp);
  }
}
