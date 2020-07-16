import { ScoreCategorySchmDObj } from "./ScoreCategorySchmDObj.model";

export class ListScoreCategorySchmDObj {
    ScoreCategorySchmHId: number;
    ScoreCategorySchmDObjs: Array<ScoreCategorySchmDObj>;

    constructor() {
        this.ScoreCategorySchmDObjs = new Array<ScoreCategorySchmDObj>();
    }
}
