import { PefindoCntrctRltnCustomObj } from "../../Pefindo/PefindoCntrctRltnCustomObj.model";
import { PefindoRltdPartyCustomObj } from "../../Pefindo/PefindoRltdPartyCustomObj.model";

export class ResViewRelationsObj {
    ListRltdParty: Array<PefindoRltdPartyCustomObj>;
    ListCntrctRltd: Array<PefindoCntrctRltnCustomObj>;

    constructor() {
        this.ListRltdParty = new Array<PefindoRltdPartyCustomObj>();
        this.ListCntrctRltd = new Array<PefindoCntrctRltnCustomObj>();
    }
}