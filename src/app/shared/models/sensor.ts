import { OrdersType, OrderType } from './common';

export interface SensorRowType {
  value: string;
  name: string;
  type: string;
}

export interface SensorRowListType {
  rows?: SensorRowType[];
}

export type StationImageFieldType = 'CREATION_DATE'

export interface StationImageOrdersType extends OrdersType {
  field: StationImageFieldType;
  order: OrderType;
}
