import { defaultPaginationParams, ListState, OrdersType, OrderType, ParamsType } from './common';
import { PaginationParamsType } from './request';

export enum StationStateType {
  INACTIVE,
  ACTIVE,
}

export class FieldIsValidType {
  id: number;
  state: boolean;
}

export class StationTariffType {
  tariffPeriodList: TariffPeriodType[];
}

export interface TariffPeriodType {
  tariffType: string;
  fromTime: string;
  toTime: string;
  tariffIntervalList: TariffIntervalType[];
}

export interface CoordinateType {
  lat: number;
  lng: number;
}

export interface TariffIntervalType {
  from?: string;
  to?: string;
  fromTime?: string;
  toTime?: string;
  price: number;
}

export type StationStatusType = 'ONLINE' | 'OFFLINE';

export interface StationQueryRowListType {
  rows?: StationQueryRowType[];
}

export interface CoordinateParamsType {
  lat: number;
  lng: number;
  maximumItems: number;
  radius: number;
}

export type StationFieldType = 'NAME' | 'STATION_QR_CODE';

export type StationFieldExtendedType = StationFieldType | 'LAT' | 'LNG' | 'RADIUS';

export interface StationOrdersType extends OrdersType {
  field: StationFieldType;
  order: OrderType;
}

export interface StationParamsType extends ParamsType {
  field: StationFieldExtendedType;
  value: string;
}

export interface StationType {
  address: string;
  description?: string;
  name: string;
  position: CoordinateType;
  stationQrCode: string;
  stationTariff?: StationTariffType;
  state?: StationStateType;
}

export interface StationInfoType {
  address: string;
  freeDocks?: number;
  name: string;
  position: CoordinateType;
  stationId: string;
  stationTariff?: StationTariffType;
  status?: StationStatusType;
  totalDocks?: number;
  description?: string;
  stationQrCode: string;
  state?: StationStateType;
}

export interface StationQueryRowType extends StationInfoType {
  freeDocks: number;
  position: CoordinateType;
  stationTariff: StationTariffType;
  status: StationStatusType;
  totalDocks: number;
  description: string;
}

export interface OptionalStationType {
  address?: string;
  description?: string;
  name?: string;
  position?: CoordinateType;
  stationQrCode?: string;
  stationTariff?: StationTariffType;
  state?: StationStateType;
}

export interface StationListState extends ListState {
  paginationParams: PaginationParamsType;
  orders?: StationOrdersType[];
  params?: StationParamsType[];
}

export const defaultStationListState: StationListState = {
  paginationParams: defaultPaginationParams,
  params: [],
};
