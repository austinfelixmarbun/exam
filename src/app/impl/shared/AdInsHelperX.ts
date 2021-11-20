import { environment } from "environments/environment";

export class AdInsHelperX {

    //Function

    public static OpenPefindoViewX(TrxNo: string, MrCustTypeCode: string, IsLos: boolean) {
        var url = environment.FoundationR3Web + "/View/Pefindo?TrxNo=" + TrxNo + "&MrCustTypeCode=" + MrCustTypeCode + "&IsLos=" + IsLos;
        window.open(url, "_blank");
    }
}
