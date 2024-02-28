import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent {

  @Input() backText = 'APP.BACK_BUTTON.BACK_TO_PREVIOUS_PAGE';
  @Input() route: string;

  constructor(
    private router: Router,
    private location: Location) { }

  goBack() {
    if (this.route) {
      this.router.navigate([this.route]);
      return;
    }
    this.location.back();
  }
}
