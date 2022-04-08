export class NotificationTemplateObj {
    NotificationTemplateId: number;
    MrNotificationLevelCode: string;
    MrNotificationSourceCode: string;
    MrNotificationTypeCode: string;
    Subject: string;
    Body: string;
    TotalParam: number;
    
    constructor() {
        this.NotificationTemplateId = 0;
        this.MrNotificationLevelCode = "";
        this.MrNotificationSourceCode = "";
        this.MrNotificationTypeCode = "";
        this.Subject = "";
        this.Body = "";
        this.TotalParam = 0;
    }
}