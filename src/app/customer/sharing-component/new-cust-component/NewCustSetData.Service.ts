import { AdInsConstant } from "app/shared/AdInstConstant";
import { CriteriaObj } from "app/shared/model/CriteriaObj.model";
import { InputAddressObj } from "app/shared/model/InputAddressObj.Model";
import { InputFieldObj } from "app/shared/model/InputFieldObj.Model";
import { InputLookupObj } from "app/shared/model/InputLookupObj.Model";
import { UcAddressObj } from "app/shared/model/UcAddressObj.Model";

export class NewCustSetData {
    
  public static BindSetLegalAddr(): InputAddressObj {
    var inputFieldObj = new InputFieldObj();
    inputFieldObj.inputLookupObj = new InputLookupObj();
    var inputAddressObj = new InputAddressObj();
    inputAddressObj.showSubsection = false;
    inputAddressObj.title = "Customer Address";
    inputAddressObj.default = new UcAddressObj();
    inputAddressObj.inputField = inputFieldObj;
    inputAddressObj.showAllPhn = false;

    return inputAddressObj;
  }

  public static BindLookupExistingCust(CustId: number, listCustIdToExclude: Array<string>, MrCustTypeCode: string): InputLookupObj{
    var existingCustomerLookUpObj = new InputLookupObj();
    existingCustomerLookUpObj.isReadonly = false;
    existingCustomerLookUpObj.urlJson = "./assets/lookup/lookupExistingCustomer.json";
    existingCustomerLookUpObj.pagingJson = "./assets/lookup/lookupExistingCustomer.json";
    existingCustomerLookUpObj.genericJson = "./assets/lookup/lookupExistingCustomer.json";

    var criteriaListCust = new Array();
    if (listCustIdToExclude.length > 0) {

      var criteriaCustObj = new CriteriaObj();
      criteriaCustObj.DataType = "text";
      criteriaCustObj.restriction = AdInsConstant.RestrictionNotIn;
      criteriaCustObj.propName = 'CUST_NO';
      criteriaCustObj.listValue = listCustIdToExclude;
      criteriaListCust.push(criteriaCustObj);
    }
    if (CustId != 0 || CustId == null) {
      var criteriaCustObj = new CriteriaObj();
      criteriaCustObj.DataType = "text";
      criteriaCustObj.restriction = AdInsConstant.RestrictionNeq;
      criteriaCustObj.propName = 'CUST_ID';
      criteriaCustObj.value = CustId.toString();
      criteriaListCust.push(criteriaCustObj);
    }

    var criteriaCustObj = new CriteriaObj();
    criteriaCustObj.DataType = "text";
    criteriaCustObj.restriction = AdInsConstant.RestrictionEq;
    criteriaCustObj.propName = 'MR_CUST_TYPE_CODE';
    criteriaCustObj.value = MrCustTypeCode;
    criteriaListCust.push(criteriaCustObj);

    existingCustomerLookUpObj.addCritInput = criteriaListCust;
    if(CustId == 0) existingCustomerLookUpObj.isReady = true;
    return existingCustomerLookUpObj;
  }
}