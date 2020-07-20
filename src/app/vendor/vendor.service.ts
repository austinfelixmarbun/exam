import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { URLConstant } from "app/shared/constant/URLConstant";

@Injectable({
    providedIn: 'root'
})
export class VendorService {
    constructor(private http: HttpClient) { }

    GetListVendorBankAccByVendorId(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.GetListVendorBankAccByVendorId, Obj);
    }

    AddVendorBankAcc(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.AddVendorBankAcc, Obj);
    }

    EditVendorBankAcc(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.EditVendorBankAcc, Obj);
    }

    GetVendorBankAccByVendorBankAccId(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.GetVendorBankAccByVendorBankAccId, Obj);
    }

    DeleteVendorBankAcc(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.DeleteVendorBankAcc, Obj);
    }

    GetRefMasterListKeyValuePair(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.GetRefMasterListKeyValueActiveByCode, Obj);
    }

    GetVendorAndVendorAddrByVendorId(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.GetVendorAndVendorAddr, Obj);
    }

    EditVendorHolding(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.EditVendorHolding, Obj);
    }

    AddVendorHolding(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.AddVendorHolding, Obj);
    }

    EditVendorATPM(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.EditVendorATPM, Obj);
    }

    AddVendorATPM(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.AddVendorATPM, Obj);
    }

    GetListVendorBankAccByVendorEmpId(Obj: any): Observable<Object> {
        return this.http.post(URLConstant.GetListVendorBankAccByVendorEmpId, Obj);
    }
}