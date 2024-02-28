import { DataSource } from '@angular/cdk/table';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import { PaginationParamsType } from '../models/request';

export abstract class ListDataSource<T> implements DataSource<T> {

  private list: BehaviorSubject<T[]>;
  private loadingState: BehaviorSubject<boolean>;
  private loading: Observable<boolean>;
  private length: number;

  constructor() {
    this.list = new BehaviorSubject([]);
    this.loadingState = new BehaviorSubject(false);
    this.loading = this.loadingState.asObservable();
    this.length = 0;
  }

  abstract fetch(
    paginationParams: PaginationParamsType,
    orders: any[],
    params: any[],
    ...restArgs: any[]): void;

  isLoading(): Observable<boolean> {
    return this.loading;
  }

  getLoadingState(): BehaviorSubject<boolean> {
    return this.loadingState;
  }

  getList(): BehaviorSubject<T[]> {
    return this.list;
  }

  setLength(length: number) {
    this.length = length;
  }

  getLength(): number {
    return this.length;
  }

  connect(): Observable<T[]> {
    return this.list.asObservable();
  }

  disconnect() {

  }
}
