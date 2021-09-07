import { ResVerfResultDCustomObj } from "../VerfResultD/ResVerfResultDCustomObj.model";

export class ResVerfResultHCustomObj{
    VerfQuestionGrpCode: string;
    VerfQuestionGrpName: string;
    VerResultList: Array<ResVerfResultDCustomObj>

    constructor(){
        this.VerfQuestionGrpCode = "";
        this.VerfQuestionGrpName = "";
    }
}