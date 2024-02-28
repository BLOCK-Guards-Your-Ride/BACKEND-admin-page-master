import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Router} from '@angular/router';

import { ListComponent } from 'src/app/shared/classes/list.component';
import { FeedbackDetailsDialogComponent }
  from '../../components/dialogs/feedback-details-dialog/feedback-details-dialog.component';
import { FeedbackService } from '../../services/feedback.service';
import {
  defaultFeedbackListState,
  FeedbackRowType,
} from './../../../shared/models/feedback';
import { FeedbackDataSource } from './feedback.datasource';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss'],
})
export class FeedbackListComponent extends ListComponent {

  constructor(
    private dialogService: MatDialog,
    feedbackService: FeedbackService, public router: Router) {
    super(new FeedbackDataSource(
      feedbackService),
      [
        'creation-date',
        'full-name',
        'description',
        'rating',
        'view',
      ],
      defaultFeedbackListState,
      router,
    );
  }

  openFeedbackDialog(feedback: FeedbackRowType) {
    this.dialogService.open(FeedbackDetailsDialogComponent, { data: feedback, panelClass: 'feedback-dialog' });
  }

}
