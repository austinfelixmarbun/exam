import { RefScoreCategoryObj } from "./RefScoreCategoryObj.model";

export class ListRefScoreCategoryObj {
    RefScoreCategoryTypeId: number;
    RefScoreCategoryObjs: Array<RefScoreCategoryObj>;

    constructor() {
        this.RefScoreCategoryObjs = new Array<RefScoreCategoryObj>();
    }
}
