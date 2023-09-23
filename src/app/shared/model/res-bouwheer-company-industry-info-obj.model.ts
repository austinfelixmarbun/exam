export class ResBouwheerCompanyIndustryInfoObj {
    BouwheerCompanyIndustryInfoId: number;
    BouwheerCompanyId: number;
    RefIndustryTypeCode: string;
    RefIndustryTypeName: string;
    BusinessStartDate: Date;
    IsMain: boolean;
    Notes: string;
    FileUpload: any;
    RowVersion: any;
    
    constructor(){
        this.BouwheerCompanyIndustryInfoId = 0, 
        this.BouwheerCompanyId = 0,
        this.RefIndustryTypeCode = '',
        this.RefIndustryTypeName = '',
        this.IsMain = false,
        this.Notes = '',
        this.RowVersion = ""
    }
}