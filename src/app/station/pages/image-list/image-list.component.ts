import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import { ListComponent } from '../../../shared/classes/list.component';
import { SnackBarComponent } from '../../../shared/components/snack-bar/snack-bar.component';
import { defaultListState } from '../../../shared/models/common';
import { StationPictureResponse } from '../../../shared/models/picture';
import { SseService } from '../../services/sse.service';
import { StationService } from '../../services/station.service';
import { ImageListDatasource } from './image-list.datasource';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
})
export class ImageListComponent extends ListComponent implements OnInit {

  public backRoute: string;
  public errorMessage: string;
  private stationId: string;

  constructor(private stationService: StationService,
              private activatedRoute: ActivatedRoute,
              private sseService: SseService,
              private snackBar: MatSnackBar,
              public router: Router) {
    super(new ImageListDatasource(stationService, activatedRoute.snapshot.params.stationId),
      [
        'requestId',
        'object',
        'creationDate',
        'url',
      ],
      defaultListState,
      router,
    );
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.stationId = this.activatedRoute.snapshot.params.stationId;
  }

  pushStationPicture() {
    this.stationService.pushStationPicture(this.stationId).subscribe(
      (_response: StationPictureResponse) => {
        this.getSnackBar('PROCESS');
        this.sseService.getServerSentEvent(this.stationId).subscribe(
          _response => {
            this.fetchData();
            this.getSnackBar('SAVE');
          },
          () => {
          },
        );
      },
    );
  }

  getSnackBar(messageSuffix: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: `APP.SNACK_BAR.SUCCESS.IMAGE.${messageSuffix}`,
      panelClass: ['snack-bar', 'snack-bar--success'],
    });
  }
}

