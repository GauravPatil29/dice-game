export enum AlertType {
    Success = "alert-success",
    Info = "alert-info",
    Warning = "alert-warning",
    Danger = "alert-danger",
    Primary = "alert-primary",
    Secondary = "alert-secondary",
    Light = "alert-light",
    Dark = "alert-dark"
}

export class Alert {
    alertType: AlertType;
    text: string;
    dismissible?: boolean;
    timeInSeconds?: number;

    constructor(alertType: AlertType, text: string, dismissible: boolean = false, timeInSeconds: number = 3) {
        this.alertType = alertType;
        this.text = text;
        this.dismissible = dismissible;
        this.timeInSeconds = timeInSeconds;
    }
}