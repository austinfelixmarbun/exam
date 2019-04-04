import { CriteriaObj } from "../model/CriteriaObj.model";

export class RequestCriteriaObj{
    includeCount:boolean;
    includeData:boolean;
    pageNo:number;
    rowPerPage:number;
    orderBy:any;
    criteria:CriteriaObj[];
    isLoading : boolean;

    constructor()
    {
        this.includeCount=true;
        this.includeData=true;
        this.isLoading = true;
    }
}