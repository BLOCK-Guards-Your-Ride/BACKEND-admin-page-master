import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './dock-operation-dialog.component.html',
  styleUrls: ['./dock-operation-dialog.component.scss'],
})
export class DockOperationDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public isFromDockList: boolean) { }
}
