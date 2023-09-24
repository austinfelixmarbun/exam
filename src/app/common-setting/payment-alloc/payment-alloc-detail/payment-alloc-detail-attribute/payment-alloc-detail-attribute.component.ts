import { ContainerService } from '@adins/uctemplate';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { Router, response } from 'express';

@Component({
  selector: 'app-payment-alloc-detail-attribute',
  templateUrl: './payment-alloc-detail-attribute.component.html',
  styles: ["input, select, textarea {height: 31px !important; border-radius: 8px  !important;border: 1px solid var(--gray-line, #DFE6E9) !important;background: var(--white-1, #FDFEFF)  !important;}"]
})
export class PaymentAllocDetailAttributeComponent implements OnInit {


  dataEvent: EventEmitter<any> = new EventEmitter<any>();
  
  form = this.fb.group({
    attributeCode: [],
    attributeName: [],
    attributeType: []
  })

  listAttributes = [];
  closeResult: string;
  mode: string;
  currEdit = {};
  Id: any;

  constructor(
    private containerService: ContainerService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.route.queryParams.subscribe(params => {
      if (params["Id"] != null) this.Id = params["Id"];
      if (params["mode"] != null) this.mode = params["mode"];
    });
  }

  ngOnInit(): void {
    //if(this.mode == 'edit') this.GetRefPaymentAllocAttrByRefPaymentAllocId();
  }

  // GetRefPaymentAllocAttrByRefPaymentAllocId(){
  //   this.http.post(URLConstant.GetRefPaymentAllocAttrByRefPaymentAllocId, {
  //     id: this.Id
  //   }).subscribe(
  //     response => {
        
  //     }
  //   );
  // }

  SaveForm(){
    this.dataEvent.emit({listSelectedSchm: 'test'});
  }

  open(content, index = null) {
    if(index !== null){
      
    }
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
        if(result == 'Save'){
          console.log('Save')
        }
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.listAttributes}`;
			},
		);
	}

}
