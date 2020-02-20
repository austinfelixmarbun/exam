import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ControlContainer, FormGroupDirective, NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { UCSearchComponent } from '@adins/ucsearch';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-uc-lookup-group',
  templateUrl: './uc-lookup-group.component.html',
  styleUrls: ['./uc-lookup-group.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class UcLookupGroupComponent implements OnInit {

  @Input() lookupInput: any;
  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  @Input() identifier: any = "lookupGeneric";
  @Output() lookup: EventEmitter<any> = new EventEmitter();
  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild('content') contentTemplate;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  
  inputObj: any;
  genericJson: any;
  searchObj: any;
  closeResult: string;
  title: any;
  isRequired: boolean;
  addCrit: Array<any>;

  constructor(private http: HttpClient, private modalService: NgbModal, private fb: FormBuilder){

  }

  ngOnInit() {
    console.log("generic");
    console.log(this.lookupInput.jsonSelect);
    this.parentForm.addControl(this.identifier, this.fb.group({
      value: ['']
    }));

    this.searchObj = new InputSearchObj();
    this.searchObj._url = this.lookupInput.urlJson;
    this.searchObj.enviromentUrl = this.lookupInput.urlEnviPaging;
    this.searchObj.apiQryPaging = this.lookupInput.urlQryPaging;
    this.searchObj.pagingJson = this.lookupInput.pagingJson;

    /* #region   Additional Criteria*/
    this.setAddCritInput();
    /* #endregion */
    
    this.inputObj = this.searchObj;
    
    /*#region is Required */
    this.isRequired = this.lookupInput.isRequired;
    /* #endregion */

    this.initiateForm();
  }
  
  initiateForm() {
    this.getJSON(this.lookupInput.genericJson).subscribe(data => {
      this.genericJson = data;
      this.parentForm.controls[this.identifier].patchValue({ value: this.lookupInput.jsonSelect[this.genericJson.propertyName] });
    })
  }

  public getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getSelect(event) {
    console.log(event);
    this.lookupInput.jsonSelect = event;
    this.parentForm.controls[this.identifier].patchValue({ value: event[this.genericJson.propertyName] });
    this.lookupInput.nameSelect = event[this.genericJson.propertyName];
    this.lookupInput.idSelect = event[this.genericJson.propertyId];
    this.lookup.emit(event);
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

  setAddCritInput() {
    if (this.lookupInput.addCritInput != null || this.lookupInput.addCritInput != undefined) {
      this.addCrit = new Array();
      for (var i = 0; i < this.lookupInput.addCritInput.length; i++) {
        this.addCrit.push(this.lookupInput.addCritInput[i]);
      }
    }
    this.searchObj.addCritInput = this.addCrit;
  }
}
