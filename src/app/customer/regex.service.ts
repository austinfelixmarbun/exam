import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { URLConstant } from "app/shared/constant/URLConstant";
import { CommonConstant } from "app/shared/constant/CommonConstant";

@Injectable({
    providedIn: 'root'
})
export class RegexService {
    constructor(private http: HttpClient) { }

    getErrMessage(pattern: string): any {
        let errMessage: string = "";
        switch (pattern) {
          case "^\\d{0,16}$":
            errMessage = 'Maximum length ID NO 16';
            break;
          case "^\\d{0,20}$":
            errMessage = 'Maximum length ID NO 20';
            break;
          default:
            errMessage = 'Not yet setting';
            break;
        }
        return errMessage;
      }

    getListPattern(): Observable<Object> {
        var RefMasterPatternCode = {
          RefMasterTypeCode: CommonConstant.RefMasterTypeCodeRegularExpression,
          RowVersion: ""
        }
        return this.http.post(URLConstant.GetListActiveRefMaster, RefMasterPatternCode);
    }
}