import {OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {cloneDeep, debounce} from 'lodash';
import {Observable} from 'rxjs';
import {defaultDebounceTime, ListState, OrderType} from '../models/common';
import {FieldType, ParamsType} from './../models/common';
import {ListDataSource} from './list.datasource';

export abstract class ListComponent implements OnInit, OnDestroy {

  public loading$: Observable<boolean>;
  public listState: ListState;
  public filterUpdate = debounce(this.filterData, defaultDebounceTime);
  public filterSelectUpdate = this.filterData.bind(this);
  public pageSizeOptions: number[];
  pageUrl = '';

  constructor(public dataSource: ListDataSource<any>,
              public displayedColumns: string[],
              listState: ListState,
              public router: Router) {
    this.listState = cloneDeep(listState);

  }

  ngOnInit() {
    this.pageSizeOptions = [10, 25, 50, 100];
    this.loading$ = this.dataSource.isLoading();

    this.pageUrl = this.router.url.split('/')[1];

    if (sessionStorage.getItem(this.pageUrl + 'page') && sessionStorage.getItem(this.pageUrl + 'rows')) {
      this.listState.paginationParams.page = Number(sessionStorage.getItem(this.pageUrl + 'page'));
      this.listState.paginationParams.rows = Number(sessionStorage.getItem(this.pageUrl + 'rows'));
    } else {
      sessionStorage.setItem(this.pageUrl + 'page', this.listState.paginationParams.page.toString());
      sessionStorage.setItem(this.pageUrl + 'rows', this.listState.paginationParams.rows.toString());

    }

    this.fetchData();
  }

  pageEvent(ev: PageEvent) {
    this.listState.paginationParams.rows = ev.pageSize;
    this.listState.paginationParams.page = ev.pageIndex;
    sessionStorage.setItem(this.pageUrl + 'page', this.listState.paginationParams.page.toString());
    sessionStorage.setItem(this.pageUrl + 'rows', this.listState.paginationParams.rows.toString());

    this.fetchData();
  }

  sortData(event: Sort) {
    if (event.direction) {
      this.listState.orders = [
        {
          field: <FieldType>event.active,
          order: <OrderType>event.direction.toUpperCase(),
        },
      ];
    } else {
      this.listState.orders = null;
    }

    this.fetchData();
  }

  fetchData() {
    this.dataSource.fetch(
      this.listState.paginationParams,
      this.listState.orders,
      this.listState.params,
    );
  }

  private filterData(ev: ParamsType) {
    const filteredParams = this.listState.params.filter(param => param.field !== ev.field);
    if (ev.value) {
      filteredParams.push(ev);
    }
    this.listState.params = filteredParams;
    this.fetchData();
  }

  ngOnDestroy(): void {
    if ((this.pageUrl + 'page' !== this.router.url.split('/')[1] + 'page')
      && (this.pageUrl + 'rows' !== this.router.url.split('/')[1]) + 'rows') {
      sessionStorage.removeItem(this.pageUrl + 'page');
      sessionStorage.removeItem(this.pageUrl + 'rows');

    }
  }
}
