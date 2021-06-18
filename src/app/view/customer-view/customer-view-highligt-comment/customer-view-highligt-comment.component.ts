import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-customer-view-highligt-comment',
  templateUrl: './customer-view-highligt-comment.component.html'
})
export class CustomerViewHighligtCommentComponent implements OnInit {
  listCustHighlightCommentObj:any;
  CustId:number;
  isView:boolean = false;
  InputDt : any;
  Comment :any;
  InputBy : any;


  constructor(private http: HttpClient ,private route: ActivatedRoute  ) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      if (params["CustId"] != null) {
        this.CustId = params["CustId"];
        this.GetListCustHighlightComment(this.CustId);
      }
    });

  }

  GetListCustHighlightComment(CustId){
    var DealerCustNoObj = { CustId: CustId };
    this.http.post(URLConstant.GetCustHighlightCommentByCustId, DealerCustNoObj).subscribe(
      response => {
        this.listCustHighlightCommentObj = response["ReturnObject"];
      }
    );

  }
  ViewHiglight(CustHighlightCommentId){
    for(var any of this.listCustHighlightCommentObj){
      if(any.CustHighlightCommentId ==CustHighlightCommentId){
        this.InputDt = any.InputDt;
        this.Comment =any.Comment;
        this.InputBy = any.InputBy;
        this.isView = true;
        break;
      }
    }
  }
  Back(){
    this.isView = false;
  }
}
