import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-uc-approveby',
  templateUrl: './uc-approveby.component.html',
})
export class UcApprovebyComponent implements OnInit {

  @Input() apvBaseUrl: string;
  @Input() schemeCode: string;
  @Input() identifier: string;
  @Input() parentForm: any;
  @Input() isRequired: boolean;
  @Input() enjiForm: NgForm;

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  DDLOpt : any;

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    if(this.isRequired)
    {
      this.parentForm.controls[this.identifier].setValidators([Validators.required])
    }
    this.LoadDDLData();
  }

LoadDDLData() {
  this.http.post(this.apvBaseUrl + "/api/RFAWeb/GetApprovedBy", { schemeCode: this.schemeCode }).subscribe(
    (response) => {
      this.DDLOpt = response;
    }
  );
}

DDL_OnChange(event){
  this.onChange.emit(event);
}
}
