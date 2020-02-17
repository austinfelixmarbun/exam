import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dummy2',
  templateUrl: './dummy2.component.html',
  styleUrls: ['./dummy2.component.scss']
})
export class Dummy2Component implements OnInit {

  // @ViewChild(UcAddressGroupComponent) VcUcAddrGrp;
  // @ViewChild('UcAddrGrp') VcUcAddrGrp : UcAddressGroupComponent;

  defVal : any;

  RefEmpForm = this.fb.group({
    EmpNo: ['', Validators.required],
    EmpName: ['', Validators.required],
    JoinDt: ['', Validators.required],
    IsExt: [false],
    IsActive: [true],
    IdNo: [''],
    Npwp: ['', [Validators.minLength(4), Validators.maxLength(10)]]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    console.log(this.RefEmpForm);
    this.defVal = {
      Addr : "asdasdasd",
      AreaCode4 : "1",
      AreaCode3 : "2",
      AreaCode2 : "3",
      AreaCode1 : "4",
      City : "1",
      PhnArea1 : "23",
      Phn1 : "3",
      PhnExt1 : "4",
      PhnArea2 : "2",
      Phn2 : "asd",
      PhnExt2 : "2",
      PhnArea3 : "3",
      Phn3 : "d",
      PhnExt3 : "f",
      FaxArea : "r",
      Fax : "r"
    };
  }

  SaveForm(asd) {
    console.log(this.RefEmpForm.valid);
    console.log(this.RefEmpForm.value);
  }
}


// CustPersonalObj.cs
// CustPersonalLegalDocObj.cs
// CustPersonalShareholderObj.cs
// CustPersonalObj.cs
// CustPersonalObj.cs
// CustPersonalObj.cs
// CustPersonalObj.cs
// CustPersonalObj.cs
// CustScoreAttrObj.cs
// CustScoreAttrContentObj.cs

// using AdIns.Customer.Interface;
// using Microsoft.AspNetCore.Mvc;

// [Route("Cust")]
// [ApiController]

// : ControllerBase

// ICustService iCustService;
// /// <summary>
// /// Cust Construtor
// /// </summary>
// /// <param name="CustService">Cust API</param>
// public CustController(ICustService iCustService)
// : base()
// {
// this.iCustService = iCustService;
// }

// #region QueryPaging

// #endregion

// #region "ADD EDIT DELETE"

// #endregion

// using AdIns.Foundation.DataModel.Entities;
// using AdIns.Foundation.DTO.Request.CustScoreAttrContent;
// using System.Threading.Tasks;

// public interface

// #region "ADD EDIT DELETE"
// Task<CustScoreAttrContent> AddCustScoreAttrContent(RequestCustScoreAttrContentObj CustScoreAttrContentObj);
// Task EditCustScoreAttrContent(RequestCustScoreAttrContentObj CustScoreAttrContentObj);
// #endregion

// #region "GET"
// Task<CustScoreAttrContent> GetCustScoreAttrContentByCustScoreAttrContentCode(string CustScoreAttrContentCode);
// Task<CustScoreAttrContent> GetCustScoreAttrContentByCustScoreAttrContentId(long CustScoreAttrContentId);
// #endregion

// using AdIns.Customer.Interface;
// using AdIns.DataAccess;
// using AdIns.Foundation.BusinessService;
// using AdIns.Foundation.DataAccess.Context;
// using AdIns.Foundation.DataModel.Entities;
// using System.Threading.Tasks;
// using AdIns.Service.QueryService;
// using System.Linq;
// using Microsoft.EntityFrameworkCore;
// using AdIns.Foundation.DTO.Request.CustScoreAttrContent;
// using AdIns.Foundation.Common;
// using AdIns.Exp.ExceptionCustomType;
// using System;

// public : BaseService, ICustScoreAttrContentService

// FoundationContext context { get; set; }
// QueryService queryService { get; set; }
// IRepository repository { get; set; }
// public CustScoreAttrContentService(FoundationContext context, Func<BaseDbContext, QueryService> queryService, Func<BaseDbContext, IRepository> repository)
//     : base(context, queryService)
// {
//     this.context = context;
//     this.queryService = queryService(context);
//     this.repository = repository(context);
// }

// #region "ADD EDIT DELETE"
// public virtual async Task<CustScoreAttrContent> AddCustScoreAttrContent(RequestCustScoreAttrContentObj CustScoreAttrContentObj)
// {
//     CustScoreAttrContent c = await getCustScoreAttrContentByCoyCode(CustScoreAttrContentObj.CoyCode);
//     if (c != null)
//     {
//         throw new AdInsCustomException(ExceptionConstant.DUPLICATE_CODE);
//     }
//     CustScoreAttrContent custScoreAttrContent = new CustScoreAttrContent
//     {
//         CoyCode = CustScoreAttrContentObj.CoyCode,
//         FullName = CustScoreAttrContentObj.FullName,
//         ShortName = CustScoreAttrContentObj.ShortName,
//         InitialName = CustScoreAttrContentObj.InitialName,
//         TaxIdNo = CustScoreAttrContentObj.TaxIdNo
//     };
//     await repository.AddAsync(custScoreAttrContent);
//     await repository.SaveChangesAsync();
//     return custScoreAttrContent;
// }

// public virtual async Task EditCustScoreAttrContent(RequestCustScoreAttrContentObj CustScoreAttrContentObj)
// {
//     CustScoreAttrContent custScoreAttrContent = await getCustScoreAttrContentByCustScoreAttrContentId(CustScoreAttrContentObj.CustScoreAttrContentId);
//     if (custScoreAttrContent == null)
//     {
//         throw new AdInsCustomException(ExceptionConstant.DATA_NOT_FOUND);
//     }

//     CustScoreAttrContent c = await getCustScoreAttrContentByCoyCode(CustScoreAttrContentObj.CoyCode);
//     if (c != null)
//     {
//         if (c.CustScoreAttrContentId != CustScoreAttrContentObj.CustScoreAttrContentId)
//         {
//             throw new AdInsCustomException(ExceptionConstant.DUPLICATE_CODE);
//         }
//     }

//     custScoreAttrContent.CoyCode = CustScoreAttrContentObj.CoyCode;
//     custScoreAttrContent.FullName = CustScoreAttrContentObj.FullName;
//     custScoreAttrContent.ShortName = CustScoreAttrContentObj.ShortName;
//     custScoreAttrContent.InitialName = CustScoreAttrContentObj.InitialName;
//     custScoreAttrContent.TaxIdNo = CustScoreAttrContentObj.TaxIdNo;
//     custScoreAttrContent.RowVersion = CustScoreAttrContentObj.RowVersion;
//     await repository.SaveChangesAsync();
// }
// #endregion

// #region "GET"
// public async Task<CustScoreAttrContent> GetCustScoreAttrContentByCustScoreAttrContentCode(string CustScoreAttrContentCode)
// {
//     CustScoreAttrContent c = await (from rc in context.CustScoreAttrContent
//                       where rc.CustScoreAttrContentCode == CustScoreAttrContentCode
//                       select rc).AsNoTracking().FirstOrDefaultAsync();
//     return c;
// }
// public async Task<CustScoreAttrContent> GetCustScoreAttrContentByCustScoreAttrContentId(long CustScoreAttrContentId)
// {
//     CustScoreAttrContent r = await (from rc in context.CustScoreAttrContent
//                       where rc.CustScoreAttrContentId == CustScoreAttrContentId
//                       select rc).AsNoTracking().FirstOrDefaultAsync();
//     return r;
// }
// #endregion

// #region GET ENTITIES
// private async Task<CustScoreAttrContent> getCustScoreAttrContentByCustScoreAttrContentCode(string CustScoreAttrContentCode)
// {
//     CustScoreAttrContent c = await (from rc in context.CustScoreAttrContent
//                        where rc.CustScoreAttrContentCode == CustScoreAttrContentCode
//                        select rc).FirstOrDefaultAsync();
//     return c;
// }
// private async Task<CustScoreAttrContent> getCustScoreAttrContentByCustScoreAttrContentId(long CustScoreAttrContentId)
// {
//     CustScoreAttrContent c = await (from rc in context.CustScoreAttrContent
//                        where rc.CustScoreAttrContentId == CustScoreAttrContentId
//                        select rc).FirstOrDefaultAsync();
//     return c;
// }
// #endregion


// CustScoreAttrId = CustScoreAttrContentObj.CustScoreAttrId,
// CustId = CustScoreAttrContentObj.CustId,
// CustScoreAttrValue = CustScoreAttrContentObj.CustScoreAttrValue,



// using AdIns.Customer.Interface;
// using AdIns.Exp.ExceptionCustomType;
// using AdIns.Foundation.Common;
// using AdIns.Foundation.Core.Filter;
// using AdIns.Foundation.DataModel.Entities;
// using AdIns.Foundation.DTO.Request.CustPersonal;
// using AdIns.Foundation.DTO.Response.CustPersonal;
// using AdIns.Foundation.DTO.Response.Generic;
// using Microsoft.AspNetCore.Mvc;
// using System.Threading.Tasks;

//  : ControllerBase

//  ICustPersonalService iCustPersonalService;
//  /// <summary>
//  /// Customer Construtor
//  /// </summary>
//  /// <param name="CustPersonalService">Customer API</param>
//  public CustPersonalController(ICustPersonalService iCustPersonalService)
//      : base()
//  {
//      this.iCustPersonalService = iCustPersonalService;
//  }

// #region "ADD EDIT DELETE"
// [Route("AddCustPersonal")]
// [HttpPost]
// [ValidateDTO]
// public async Task<JsonResult> AddCustPersonal(RequestCustPersonalObj reqCustPersonalObj)
// {
//     CustPersonal custPersonal = await iCustPersonalService.AddCustPersonal(reqCustPersonalObj);
//     ResponseCustPersonalObj responseCustPersonalObj = new ResponseCustPersonalObj();

//     responseCustPersonalObj.CustPersonalId = custPersonal.CustPersonalId;
//     responseCustPersonalObj.PhnArea1 = custPersonal.PhnArea1;
//     responseCustPersonalObj.PhnArea2 = custPersonal.PhnArea2;
//     responseCustPersonalObj.PhnArea3 = custPersonal.PhnArea3;
//     responseCustPersonalObj.FaxArea = custPersonal.FaxArea;
//     responseCustPersonalObj.RowVersion = custPersonal.RowVersion;

//     return new JsonResult(responseCustPersonalObj);
// }

// [Route("EditCustPersonal")]
// [HttpPost]
// [ValidateDTO]
// public async Task<JsonResult> EditCustPersonal(RequestCustPersonalObj reqCustPersonalObj)
// {
//     await iCustPersonalService.EditCustPersonal(reqCustPersonalObj);
//     ResponseSuccessObj responseSuccessObj = new ResponseSuccessObj();
//     return new JsonResult(responseSuccessObj);
// }
// #endregion

// #region "GET"
// [Route("GetCustPersonalByCoyCode")]
// [HttpPost]
// public async Task<JsonResult> GetCustPersonalByCoyCode(RequestCustPersonalObj reqCustPersonalObj)
// {
//     CustPersonal custPersonal = await iCustPersonalService.GetCustPersonalByCoyCode(reqCustPersonalObj.CoyCode);
//     if (custPersonal == null)
//     {
//         throw new AdInsCustomException(ExceptionConstant.DATA_NOT_FOUND);
//     }

//     ResponseCustPersonalObj responseCustPersonalObj = new ResponseCustPersonalObj();
//     responseCustPersonalObj.CustPersonalId = custPersonal.CustPersonalId;
//     responseCustPersonalObj.PhnArea1 = custPersonal.PhnArea1;
//     responseCustPersonalObj.PhnArea2 = custPersonal.PhnArea2;
//     responseCustPersonalObj.PhnArea3 = custPersonal.PhnArea3;
//     responseCustPersonalObj.FaxArea = custPersonal.FaxArea;
//     responseCustPersonalObj.RowVersion = custPersonal.RowVersion;

//     return new JsonResult(responseCustPersonalObj);
// }

// [Route("GetCustPersonalByCustPersonalId")]
// [HttpPost]
// public async Task<JsonResult> GetCustPersonalByCustPersonalId(RequestCustPersonalObj reqCustPersonalObj)
// {
//     CustPersonal custPersonal = await iCustPersonalService.GetCustPersonalByCustPersonalId(reqCustPersonalObj.CustPersonalId);
//     if (custPersonal == null)
//     {
//         throw new AdInsCustomException(ExceptionConstant.DATA_NOT_FOUND);
//     }

//     ResponseCustPersonalObj responseCustPersonalObj = new ResponseCustPersonalObj();
//     custPersonal.CustId = CustPersonalObj.CustId;
//     custPersonal.SharePrcnt = CustPersonalObj.SharePrcnt;
//     custPersonal.ShareholderId = CustPersonalObj.ShareholderId;
//     custPersonal.MrJobPosition = CustPersonalObj.MrJobPosition;
//     custPersonal.IsDefault = CustPersonalObj.IsDefault;
//     custPersonal.IsActive = CustPersonalObj.IsActive;
//     custPersonal.IsSigner1 = CustPersonalObj.IsSigner1;
//     custPersonal.IsSigner2 = CustPersonalObj.IsSigner2;
//     custPersonal.IsSigner3 = CustPersonalObj.IsSigner3; 
//     responseCustPersonalObj.RowVersion = custPersonal.RowVersion;

//     return new JsonResult(responseCustPersonalObj);
// }
// #endregion


// responseCustPersonalObj.CustPersonalId = custPersonal.CustPersonalId;
// responseCustPersonalObj.CustFullName = custPersonal.CustFullName;
// responseCustPersonalObj.CustPrefixName = custPersonal.CustPrefixName;
// responseCustPersonalObj.CustSuffixName = custPersonal.CustSuffixName;
// responseCustPersonalObj.NickName = custPersonal.NickName;
// responseCustPersonalObj.BirthPlace = custPersonal.BirthPlace;
// responseCustPersonalObj.BirthDt = custPersonal.BirthDt;
// responseCustPersonalObj.MotherMaidenName = custPersonal.MotherMaidenName;
// responseCustPersonalObj.MrGender = custPersonal.MrGender;
// responseCustPersonalObj.MrReligion = custPersonal.MrReligion;
// responseCustPersonalObj.MrEducation = custPersonal.MrEducation;
// responseCustPersonalObj.MrIdType = custPersonal.MrIdType;
// responseCustPersonalObj.IdNo = custPersonal.IdNo;
// responseCustPersonalObj.IdExpiredDt = custPersonal.IdExpiredDt;
// responseCustPersonalObj.MrNationality = custPersonal.MrNationality;
// responseCustPersonalObj.WnaCountryCode = custPersonal.WnaCountryCode;
// responseCustPersonalObj.MobilePhnNo1 = custPersonal.MobilePhnNo1;
// responseCustPersonalObj.MobilePhnNo2 = custPersonal.MobilePhnNo2;
// responseCustPersonalObj.EMail1 = custPersonal.EMail1;
// responseCustPersonalObj.EMail2 = custPersonal.EMail2;
// responseCustPersonalObj.MrMaritalStat = custPersonal.MrMaritalStat;
// responseCustPersonalObj.NoOfDependents = custPersonal.NoOfDependents;
// responseCustPersonalObj.FamilyCardNo = custPersonal.FamilyCardNo;
// responseCustPersonalObj.NoOfResidence = custPersonal.NoOfResidence;
// responseCustPersonalObj.IsRestInPeace = custPersonal.IsRestInPeace;
// responseCustPersonalObj.MrSalutation = custPersonal.MrSalutation;
// responseCustPersonalObj.IsJointIncome = custPersonal.IsJointIncome;
// responseCustPersonalObj.RowVersion = custPersonal.RowVersion;