import { ParameterObj } from "./ParameterObj.Model";

export class RefFormObj {
    RefFormId: any;
    FormCode: string;
    Title: string;
    Path: string;
    Icon: string;
    Class: string;
    BadgeClass: string;
    FormConfiguration: string;
    ParentId: number;
    OrderNo: number;
    HierarchyNo: any;
    IsHidden: any;
    IsExternalLink: boolean;
    Params : any;
    RefModuleId: any;
    ParameterList : Array<ParameterObj>;
    RowVersion: any;
    
    constructor() { this.RefFormId = 0 }
}
