import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { FeedbackDetailsDialogComponent } from './components/dialogs/feedback-details-dialog/feedback-details-dialog.component';
import { RateDisplayComponent } from './components/rate-display/rate-display.component';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackListComponent } from './pages/feedback-list/feedback-list.component';
import { FeedbackService } from './services/feedback.service';

@NgModule({
  declarations: [
    FeedbackListComponent,
    FeedbackDetailsDialogComponent,
    RateDisplayComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    FeedbackRoutingModule,
  ],
  providers: [FeedbackService],
})
export class FeedbackModule { }
