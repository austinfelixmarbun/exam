import { AdInsConstant } from "app/shared/AdInstConstant";
import { CommonConstant } from "app/shared/constant/CommonConstant";
import { CriteriaObj } from "app/shared/model/CriteriaObj.model";
import { InputAddressObj } from "app/shared/model/InputAddressObj.Model";
import { InputFieldObj } from "app/shared/model/InputFieldObj.Model";
import { InputLookupObj } from "app/shared/model/InputLookupObj.Model";

export class NewCustSetData {

  public static BindSetLegalAddr(): InputAddressObj {
    let inputFieldObj = new InputFieldObj();
    inputFieldObj.inputLookupObj = new InputLookupObj();
    let inputAddressObj = new InputAddressObj();
    inputAddressObj.showSubsection = false;
    inputAddressObj.title = "Customer Address";
    inputAddressObj.inputField = inputFieldObj;
    inputAddressObj.showAllPhn = false;
    inputAddressObj.showOwnership = true;
    inputAddressObj.requiredOwnership = true;

    return inputAddressObj;
  }

  public static BindLookupPositionSlik(): InputLookupObj {
    let inputLookupObjName = new InputLookupObj();
    inputLookupObjName.urlJson = "./assets/uclookup/Customer/lookupPositionSlik.json";
    inputLookupObjName.pagingJson = "./assets/uclookup/Customer/lookupPositionSlik.json";
    inputLookupObjName.genericJson = "./assets/uclookup/Customer/lookupPositionSlik.json";
    inputLookupObjName.isRequired = false;
    return inputLookupObjName;
  }

  public static BindLookupExistingCust(CustId: number, listCustNoToExclude: Array<string>, MrCustTypeCode: string): InputLookupObj {
    let existingCustomerLookUpObj = new InputLookupObj();
    existingCustomerLookUpObj.isReadonly = false;
    existingCustomerLookUpObj.urlJson = "./assets/lookup/lookupExistingCustomer.json";
    existingCustomerLookUpObj.pagingJson = "./assets/lookup/lookupExistingCustomer.json";
    existingCustomerLookUpObj.genericJson = "./assets/lookup/lookupExistingCustomer.json";

    existingCustomerLookUpObj.addCritInput = this.ResetCriteriaExisting(CustId, listCustNoToExclude, MrCustTypeCode);
    if (CustId == 0) existingCustomerLookUpObj.isReady = true;
    return existingCustomerLookUpObj;
  }

  public static ResetCriteriaExisting(CustId: number, listCustNoToExclude: Array<string>, MrCustTypeCode: string, IsMarried: boolean = false, ParentGenderCode: string = ""): Array<CriteriaObj> {
    let criteriaListCust = new Array();
    if (listCustNoToExclude.length > 0) {

      let criteriaCustObj = new CriteriaObj();
      criteriaCustObj.DataType = "text";
      criteriaCustObj.restriction = AdInsConstant.RestrictionNotIn;
      criteriaCustObj.propName = 'C.CUST_NO';
      criteriaCustObj.listValue = listCustNoToExclude;
      criteriaListCust.push(criteriaCustObj);
    }
    if (CustId != 0 || CustId == null) {
      let criteriaCustObj = new CriteriaObj();
      criteriaCustObj.DataType = "text";
      criteriaCustObj.restriction = AdInsConstant.RestrictionNeq;
      criteriaCustObj.propName = 'C.CUST_ID';
      criteriaCustObj.value = CustId.toString();
      criteriaListCust.push(criteriaCustObj);
    }

    if(IsMarried){
      let criteriaCustObj = new CriteriaObj();
      criteriaCustObj.DataType = "text";
      criteriaCustObj.restriction = AdInsConstant.RestrictionEq;
      criteriaCustObj.propName = 'CP.MR_MARITAL_STAT_CODE';
      criteriaCustObj.value = CommonConstant.MR_MARITAL_STAT_CODE_MARRIED;
      criteriaListCust.push(criteriaCustObj);

      // criteriaCustObj = new CriteriaObj();
      // criteriaCustObj.DataType = "text";
      // criteriaCustObj.restriction = AdInsConstant.RestrictionEq;
      // criteriaCustObj.propName = 'CP.MR_GENDER_CODE';
      // criteriaCustObj.value = ParentGenderCode == CommonConstant.GENDER_MALE ? CommonConstant.GENDER_FEMALE : CommonConstant.GENDER_MALE;
      // criteriaListCust.push(criteriaCustObj);
    }

    let criteriaCustObj = new CriteriaObj();
    criteriaCustObj.DataType = "text";
    criteriaCustObj.restriction = AdInsConstant.RestrictionEq;
    criteriaCustObj.propName = 'MR_CUST_TYPE_CODE';
    criteriaCustObj.value = MrCustTypeCode;
    criteriaListCust.push(criteriaCustObj);

    return criteriaListCust;
  }
}