import { Component, OnInit } from '@angular/core';
import { GroupsService } from './groups.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  constructor(private groupsservice: GroupsService) { }

  ngOnInit() {
  }

}
