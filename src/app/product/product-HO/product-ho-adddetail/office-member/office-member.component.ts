import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-office-member',
  templateUrl: './office-member.component.html',
  styleUrls: ['./office-member.component.scss']
})
export class OfficeMemberComponent implements OnInit {

  @Input() objInput: any;
  
  constructor() { }

  ngOnInit() {
  }

}
