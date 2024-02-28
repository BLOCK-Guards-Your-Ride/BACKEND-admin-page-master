import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { AuthService } from 'src/app/core/services/auth.service';
import { Permission } from 'src/app/shared/models/common';

@Directive({
  selector: '[appPermission]',
})
export class PermissionDirective implements OnInit {

  private hasView: boolean;

  @Input() set appPermission(permissions: Permission[]) {
    this.authService.getPermissions()
      .subscribe(userPermissions => {
        const hasPermissions = permissions.every(perm => userPermissions.includes(perm));

        this.viewContainer.clear();
        if (hasPermissions && !this.hasView) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          this.hasView = true;
        } else if (!hasPermissions && this.hasView) {
          this.hasView = false;
        }
      });
  }

  @Input() set appPermissionElse(templateRef: TemplateRef<any>) {
    if (!this.hasView) {
      this.viewContainer.createEmbeddedView(templateRef);
    }
  }

  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) {
  }

  ngOnInit() {
    this.hasView = false;
  }

}
