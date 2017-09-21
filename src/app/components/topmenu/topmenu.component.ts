import { UserService } from './../../services/user-service/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent{
  firstname: string;
  lastname: string;
  department: string;
  occupation: string;

  constructor(private userService: UserService) {
    let user = userService.getUserData();
    this.firstname = user.first_name;
    this.lastname = user.last_name;
    this.department = user.department;
    this.occupation = user.occupation;
   }
}
