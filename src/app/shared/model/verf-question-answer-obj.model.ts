export class VerfQuestionAnswerObj {
    VerfQuestionAnswerId: number;
    RefVerfAnswerTypeId: number;
    VerfQuestionCode: string;
    VerfQuestionText: string;
    VerfAnswer: string;
    IsActive: boolean;
    RowVersion: string;
    constructor() { this.VerfQuestionAnswerId = 0; this.RefVerfAnswerTypeId = 0 }
}