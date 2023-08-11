import { AdInsHelper } from "../AdInsHelper";

function getId(listTemp: any)
{
    let listId = [];
    
    listTemp.forEach(x => {
    listId.push(x.VendorId)});
    
    return listId;
}

export function addRangeVendorMbr(listTemp: any, VendorId: number, api: any, next: string, from: string) {
  const _getEnvi = this._http.get('assets/config/enviConfig.json');
  
  let listId = getId(listTemp);
  let obj = {};
  let param = {};
  let url = "";

  if (from == "SUPPLIER_GRP")
  {
    obj = {
        "VendorId": listId,
        "VendorGrpId": VendorId,
    }

    param = {
        "VendorSchmId": VendorId,
        "MrVendorCategoryCode": "SUPPLIER"
    }

    url = _getEnvi.FoundationR3Url + api
  }

  if (from == "SUPPLIER_GRP")
  {
    obj = {
        "VendorId": listId,
        "VendorGrpId": VendorId,
    }

    param = {
        "VendorGrpId": VendorId,
        "MrVendorCategoryCode": "SUPPLIER"
    }

    url = _getEnvi.FoundationR3Url + api
  }

  this.http.post(url, obj).toPromise().then(
    (response: any) => {
        this.toastr.successMessage("Success!");
        AdInsHelper.RedirectUrl(this.router, [next], param);
    })
  
}