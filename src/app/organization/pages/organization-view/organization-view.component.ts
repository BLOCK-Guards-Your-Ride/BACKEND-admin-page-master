import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { getObject, getObjectWithoutId } from 'src/app/core/utils';
import { DataViewPipe } from 'src/app/shared/components/data-view/data-view.component';
import { moduleNames } from 'src/app/shared/models/common';
import { OrganizationInfoType } from 'src/app/shared/models/organization';
import { TranslateCommonPipe } from 'src/app/shared/pipes/translate-common.pipe';

@Component({
  selector: 'app-organization-view',
  templateUrl: './organization-view.component.html',
  styleUrls: ['./organization-view.component.scss'],
})
export class OrganizationViewComponent implements OnInit {

  organizationInfo: Partial<OrganizationInfoType>;
  pipes: DataViewPipe[];
  backRoute: string;

  constructor(
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.backRoute = moduleNames.organization;
    this.organizationInfo = getObjectWithoutId<OrganizationInfoType>(
      getObject(this.activatedRoute.snapshot.data.resolved, ['info']));
    this.pipes = [
      {
        prop: 'orgType',
        pipe: new TranslateCommonPipe(this.translateService),
      },
      {
        prop: 'enabled',
        pipe: new TranslateCommonPipe(this.translateService),
      },
    ]
  }

}
