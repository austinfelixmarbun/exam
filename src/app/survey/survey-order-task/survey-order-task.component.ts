import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-survey-order-task',
  templateUrl: './survey-order-task.component.html',
  styleUrls: ['./survey-order-task.component.scss']
})
export class SurveyOrderTaskComponent implements OnInit {

  SurveyTaskForm = this.fb.group({
    SrvyTaskNo: [''],
    MrSrvySubjCode: [''],
    MrSrvyObjCode: [''],
    SrvyFormSchmId: [''],
    SurveyorCode: ['']
  });

  viewObj: string;
  modal : any;
  closeResult : any;
  SurveyTaskList: any;

  constructor(private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit() {
    this.SurveyTaskList = new Array();
    this.viewObj = "./assets/ucviewgeneric/viewSurveyOrderTask.json";
  }

  AddModal(content)
  {
    this.modal = this.modalService.open(content);
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.modal.close();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.modal.close();
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  Back()
  {
    this.modal.close();
  }

  editFromTemp(ev) {

  }

  deleteFromTemp(ev) {

  }

}
