import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FeedbackRowType } from './../../../../shared/models/feedback';

@Component({
  templateUrl: './feedback-details-dialog.component.html',
  styleUrls: ['./feedback-details-dialog.component.scss'],
})
export class FeedbackDetailsDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public feedback: FeedbackRowType) { }

}
