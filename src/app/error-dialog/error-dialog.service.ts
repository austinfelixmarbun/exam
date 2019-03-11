import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ErrorDialogComponent } from './error-dialog.component';

@Injectable()
export class ErrorDialogService {
    constructor(public dialog: MatDialog) { }
    openDialog(data): void {
        console.log(data)
    }
}