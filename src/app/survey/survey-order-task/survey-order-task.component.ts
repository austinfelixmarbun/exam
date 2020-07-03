import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SrvyTaskObj } from 'app/shared/model/SrvyTaskObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-survey-order-task',
  templateUrl: './survey-order-task.component.html'
})
export class SurveyOrderTaskComponent implements OnInit {

  SurveyTaskForm = this.fb.group({
    SrvyTaskId: [''],
    SrvyTaskNo: [''],
    MrSrvySubjCode: ['', [Validators.required]],
    MrSrvyObjCode: ['', [Validators.required]],
    SrvyFormSchmId: ['', [Validators.required]],
    SurveyorCode: ['', [Validators.required]]
  });

  viewObj: string;
  modal: any;
  closeResult: any;
  SurveyTaskList: any;
  resultData: any;
  SrvyOrderId: number;
  SrvySubjList = [];
  SrvyObjList = [];
  FormSchmList = [];
  SrvyOrderObj: any;
  SrvyTaskObj: SrvyTaskObj = new SrvyTaskObj();
  VendorObj: any;

  constructor(private fb: FormBuilder, private modalService: NgbModal,
    private http: HttpClient, private route: ActivatedRoute, private router: Router, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      if (params["SrvyOrderId"] != null) {
        this.SrvyOrderId = params["SrvyOrderId"];
      }
    });
  }

  ngOnInit() {
    this.SurveyTaskList = new Array();
    this.viewObj = "./assets/ucviewgeneric/viewSurveyOrderTask.json";

    this.generateSurveyTaskList();
    this.generateListSrvyObject();

    var SrvyObj = {
      SrvyOrderId: this.SrvyOrderId
    }
    this.http.post(AdInsConstant.GetSrvyOrderBySrvyOrderId, SrvyObj).subscribe(
      response => {
        this.SrvyOrderObj = response;
        var VendorObj = {
          VendorId: this.SrvyOrderObj.VendorId
        };
        this.http.post(AdInsConstant.GetVendorByVendorId, VendorObj).subscribe(
          response => {
            this.VendorObj = response;
            console.log(this.VendorObj);
            this.SurveyTaskForm.patchValue({
              SurveyorCode: this.VendorObj.VendorCode
            });
          },
          error => {
            console.log(error);
          }
        );

      },
      error => {
        console.log(error);
      }
    );

    this.http.post(AdInsConstant.GetListAllSrvyFormSchm, SrvyObj).subscribe(
      response => {
        this.FormSchmList = response["ReturnObject"];
        this.SurveyTaskForm.patchValue({
          SrvyFormSchmId: this.FormSchmList[0].SrvyFormSchmId
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  SendSrvyOrder() {
    this.http.post(AdInsConstant.SendSrvyOrder, this.SrvyOrderObj).subscribe(
      response => {
        this.toastr.successMessage(response["Message"]);
        this.router.navigate(["/Survey/Paging"]);
      },
      error => {
        console.log(error);
      }
    );
  }

  onChange(ev) {
    for (let i = 0; i < this.resultData.length; i++) {
      if (this.resultData[i].SurveySubject == ev) {
        this.setSrvyObjList(i);
        break;
      }
    }
  }

  AddModal(content) {
    this.modal = this.modalService.open(content);
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.modal.close();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.modal.close();
    });

    this.SurveyTaskForm.patchValue({
      SrvyTaskId: "",
      SrvyTaskNo: "",
      MrSrvySubjCode: this.SrvySubjList[0].Key,
      MrSrvyObjCode: "",
      SrvyFormSchmId: this.FormSchmList[0].SrvyFormSchmId
    });

    this.setSrvyObjList();
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

  Back() {
    this.modal.close();
  }

  editData(content, ev) {
    this.modal = this.modalService.open(content);
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.modal.close();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.modal.close();
    });

    var TaskObj = {
      SrvyTaskId: ev
    }
    this.http.post<SrvyTaskObj>(AdInsConstant.GetSrvyTaskBySrvyTaskId, TaskObj).subscribe(
      response => {
        this.SrvyTaskObj = response;
        this.onChange(this.SrvyTaskObj.MrSrvySubjCode);
        this.SurveyTaskForm.patchValue({
          SrvyTaskId: this.SrvyTaskObj.SrvyTaskId,
          SrvyTaskNo: this.SrvyTaskObj.SrvyTaskNo,
          MrSrvySubjCode: this.SrvyTaskObj.MrSrvySubjCode,
          MrSrvyObjCode: this.SrvyTaskObj.MrSrvyObjCode,
          SrvyFormSchmId: this.SrvyTaskObj.SrvyFormSchmId,
          SurveyorCode: this.SrvyTaskObj.SurveyorCode,
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteData(ev) {
    if (confirm("Are you sure to delete this record?")) {
      var TaskObj = {
        SrvyTaskId: ev
      }
      this.http.post(AdInsConstant.DeleteSrvyTask, TaskObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          this.generateSurveyTaskList();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  SaveForm() {
    this.SrvyTaskObj.SrvyOrderId = this.SrvyOrderId;
    this.SrvyTaskObj.MrSrvySubjCode = this.SurveyTaskForm.controls["MrSrvySubjCode"].value;
    this.SrvyTaskObj.MrSrvyObjCode = this.SurveyTaskForm.controls["MrSrvyObjCode"].value;
    this.SrvyTaskObj.SrvyFormSchmId = this.SurveyTaskForm.controls["SrvyFormSchmId"].value;
    this.SrvyTaskObj.SurveyorCode = this.SurveyTaskForm.controls["SurveyorCode"].value;


    let srvySubj = this.SrvySubjList.find(x => x.Key == this.SrvyTaskObj.MrSrvySubjCode);
    this.SrvyTaskObj.MrSrvySubj = srvySubj.Value;
    let srvyObj = this.SrvyObjList.find(x => x.Key == this.SrvyTaskObj.MrSrvyObjCode);
    this.SrvyTaskObj.MrSrvyObj = srvyObj.Value;

    console.log(this.SrvyTaskObj);
    if (this.SurveyTaskForm.controls["SrvyTaskId"].value == "") {
      this.SrvyTaskObj.SrvyTaskNo = "";

      this.http.post(AdInsConstant.AddSrvyTask, this.SrvyTaskObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          this.generateSurveyTaskList();
          this.modal.close();
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.SrvyTaskObj.SrvyTaskId = this.SurveyTaskForm.controls["SrvyTaskId"].value;
      this.SrvyTaskObj.SrvyTaskNo = this.SurveyTaskForm.controls["SrvyTaskNo"].value;
      this.SrvyTaskObj.RowVersion = this.SrvyTaskObj.RowVersion;

      this.http.post(AdInsConstant.EditSrvyTask, this.SrvyTaskObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          this.generateSurveyTaskList();
          this.modal.close();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  setSrvyObjList(arr = 0) {
    this.SrvyObjList = [];
    this.SurveyTaskForm.patchValue({
      MrSrvyObjCode: ""
    });

    if (this.resultData[arr].ListAddrArr != null && this.resultData[arr].ListAddrArr.length != 0) {
      for (let j = 0; j < this.resultData[arr].ListAddrArr.length; j++) {
        this.SrvyObjList.push(this.resultData[arr].ListAddrArr[j]);
      }
      this.SurveyTaskForm.patchValue({
        MrSrvyObjCode: this.SrvyObjList[0].Key
      });
    }
  }

  generateListSrvyObject() {
    var obj = {
      SrvyOrderId: this.SrvyOrderId
    }
    this.http.post(AdInsConstant.GetListSryvObject, obj).subscribe(
      (response) => {
        console.log(JSON.stringify(response));
        this.resultData = response;
        if (this.resultData.length != 0) {
          for (let i = 0; i < this.resultData.length; i++) {
            this.SrvySubjList.push({ Key: this.resultData[i].SurveySubject, Value: this.resultData[i].CustomerName });
          }
          this.SurveyTaskForm.patchValue({
            MrSrvySubjCode: this.SrvySubjList[0].Key
          });
          this.setSrvyObjList();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  generateSurveyTaskList() {
    var SrvyTaskObj = {
      SrvyOrderId: this.SrvyOrderId,
      RowVersion: ""
    }
    this.http.post(AdInsConstant.GetListSrvyTaskBySrvyOrderId, SrvyTaskObj).subscribe(
      response => {
        this.SurveyTaskList = response;
      },
      error => {
        console.log(error);
      }
    );
  }
}
