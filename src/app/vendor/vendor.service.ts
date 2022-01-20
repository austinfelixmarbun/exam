import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { URLConstant } from "app/shared/constant/URLConstant";
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from "app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model";
import { GenericByIdObj } from "app/shared/model/generic/generic-by-id-obj.model";
import { AdInsConstant } from "app/shared/AdInstConstant";

@Injectable({
    providedIn: 'root'
})
export class VendorService {
    constructor(private http: HttpClient) { }

    GetListVendorBankAccByVendorId(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.GetListVendorBankAccByVendorId, Obj);
    }

    AddVendorBankAcc(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.AddVendorBankAcc, Obj, AdInsConstant.SpinnerOptions);
    }

    EditVendorBankAcc(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.EditVendorBankAcc, Obj, AdInsConstant.SpinnerOptions);
    }

    GetVendorBankAccByVendorBankAccId(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.GetVendorBankAccByVendorBankAccId, Obj);
    }

    DeleteVendorBankAcc(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.DeleteVendorBankAcc, Obj, AdInsConstant.SpinnerOptions);
    }

    GetRefMasterListKeyValuePair(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.GetRefMasterListKeyValueActiveByCode, Obj);
    }

    GetListActiveRefMasterWithMappingCodeAll(Obj: ReqRefMasterByTypeCodeAndMappingCodeObj): Observable<Object> {
        return this.http.post(URLConstant.GetListActiveRefMasterWithMappingCodeAll, Obj);
    }

    GetVendorAndVendorAddrByVendorId(Obj: GenericByIdObj): Observable<Object> {
        return this.http.post(URLConstant.GetVendorAndVendorAddr, Obj);
    }

    EditVendorHolding(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.EditVendorHolding, Obj, AdInsConstant.SpinnerOptions);
    }

    AddVendorHolding(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.AddVendorHolding, Obj, AdInsConstant.SpinnerOptions);
    }

    EditVendorATPM(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.EditVendorATPM, Obj, AdInsConstant.SpinnerOptions);
    }

    AddVendorATPM(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.AddVendorATPM, Obj, AdInsConstant.SpinnerOptions);
    }

    GetListVendorBankAccByVendorEmpId(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.GetListVendorBankAccByVendorEmpId, Obj);
    }

    GetAuctionCompanyByVendorIdForEdit(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.GetVendorByIdForEdit, Obj);
    }

    EditAuctionCompany(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.EditAuctionCompany, Obj, AdInsConstant.SpinnerOptions);
    }
}