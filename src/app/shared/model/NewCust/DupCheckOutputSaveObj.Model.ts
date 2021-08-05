import { CustDuplicateObj } from "./CustDuplicateObj.Model";
import { NegCustDuplicateObj } from "./NegCustDuplicateObj.Model";

export class DupCheckOutputSaveObj {
    Key: string;
    DuplicateObj: CustDuplicateObj;
    DuplicateNegativeObj: NegCustDuplicateObj;
    constructor() {
        this.Key = "";
    }

    public static KeyEditSave = "SAVE";
    public static KeyEditSaveDup = "SAVE_DUP"
    public static KeyEditSaveDupNeg = "SAVE_DUP_NEG"
}