import {
  defaultPaginationParams,
  ListState,
  OrdersType,
  OrderType,
  ParamsType,
} from './common';
import { PaginationParamsType } from './request';

export enum DockOperationType {
  'OPEN',
  'OPEN_AND_STOP_PARKING_SESSION',
}

export interface DockInfoType {
  lastOpenState: string;
  operation: DockOperationType;
}

export interface StationDockType {
  operation: DockOperationType;
}

export type StationDockFieldType = 'DOCK_NR';

export interface StationDockOrdersType extends OrdersType {
  field: StationDockFieldType;
  order: OrderType;
}

export type StationDockParamsFieldType = 'BOLT_LOCKED' | 'OCCUPIED' | 'ENABLED' | 'DOCK_NR';

export interface StationDockParamsType extends ParamsType {
  field: StationDockParamsFieldType;
  value: string;
}

export type LastOpenStateType = 'OPENED' | 'STUCKED' | 'RECLOSED' | 'IN_PROGRESS' | 'UNKNOWN';

export interface StationDockQueryRowType {
  boltLocked: boolean;
  dockNr: number;
  enabled: boolean;
  lastOpenState: LastOpenStateType;
  occupied: boolean;
}

export interface StationDockQueryRowListType {
  rows?: StationDockQueryRowType[];
}

export interface StationDockListState extends ListState {
  paginationParams: PaginationParamsType;
  orders?: StationDockOrdersType[];
  params?: StationDockParamsType[];
}

export const defaultStationDockListState: StationDockListState = {
  paginationParams: defaultPaginationParams,
  params: [],
};
