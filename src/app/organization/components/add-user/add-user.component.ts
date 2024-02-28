import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {

  isLoading: boolean;
  errorMessage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private organizationService: OrganizationService) { }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.errorMessage = null;
    const orgId = this.activatedRoute.snapshot.params.orgId;
    this.organizationService.adduserToOrganization(orgId, form.value.userId).pipe(
      tap((status) => {
        this.isLoading = false;
        this.errorMessage = status;
      }),
    ).subscribe();
  }

}
