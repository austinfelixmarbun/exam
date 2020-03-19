import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-contact-person-list',
  templateUrl: './contact-person-list.component.html',
  styleUrls: ['./contact-person-list.component.scss']
})
export class ContactPersonListComponent implements OnInit {
  @Output() objOutput: EventEmitter<any> = new EventEmitter();
  HiddenState: boolean;
  constructor() { }

  ngOnInit() {
  }

  HiddenCheck(){
    this.HiddenState = false;
    this.objOutput.emit(this.HiddenState);
  }
}
