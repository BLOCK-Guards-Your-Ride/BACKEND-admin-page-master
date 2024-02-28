import {
  defaultPaginationParams,
  ListState,
  OrdersType,
  OrderType,
  ParamsType,
} from './common';
import { PaginationParamsType } from './request';

export type ParkingSessionFieldType = 'STATION_NAME' | 'PARKING_START_TIME' | 'PRICE';

export interface ParkingSessionOrdersType extends OrdersType {
  field: ParkingSessionFieldType;
  order: OrderType;
}

export interface ParkingSessionParamsType extends ParamsType {
  field: 'USER_ID' | 'STATION_NAME';
  value: string;
}

export interface ParkingSessionStationType {
  name: string;
  stationId: number;
  stationUniqueIdentifier: string;
}

export interface ParkingSessionRowType {
  dockNr: number;
  parkingSessionId: number;
  parkingSessionUUID: string;
  parkingStartTime: Date;
  parkingStopTime: Date;
  price: number;
  station: ParkingSessionStationType;
}

export interface ParkingSessionRowListType {
  rows?: ParkingSessionRowType[];
}

export interface ParkingSessionListState extends ListState {
  paginationParams: PaginationParamsType;
  orders?: ParkingSessionOrdersType[];
  params?: ParkingSessionParamsType[];
}

export const defaultParkingSessionListState: ParkingSessionListState = {
  paginationParams: defaultPaginationParams,
  orders: [
    {
      field: 'PARKING_START_TIME',
      order: 'DESC',
    },
  ],
  params: [],
};
