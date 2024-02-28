import {
  defaultPaginationParams,
  ListState,
  OrdersType,
  OrderType,
  ParamsType,
} from './common';
import { PaginationParamsType } from './request';

export type ClientInformationQueryFieldType = 'PHONE_CLIENT_VERSION' | 'VALID_FROM' | 'VALID_TO' | 'CREATION_DATE';

export type ClientInformationParamsFieldType =
  'VALID_FROM_FROM' | 'VALID_FROM_TO' | 'VALID_TO_FROM' | 'VALID_TO_TO' | 'PHONE_CLIENT_VERSION';

export interface ClientInformationOrdersType extends OrdersType {
  field: ClientInformationQueryFieldType;
  order: OrderType;
}

export interface ClientInformationParamsType extends ParamsType {
  field: ClientInformationParamsFieldType;
  value: string;
}

export interface ClientInformationRowType {
  creationDate: Date;
  id: string;
  phoneClientVersion: string;
  validFrom: Date;
  validTo?: Date;
}

export interface ClientInformationRowListType {
  rows?: ClientInformationRowType[];
}

export interface ClientInformationListState extends ListState {
  paginationParams: PaginationParamsType;
  orders?: ClientInformationOrdersType[];
  params?: ClientInformationParamsType[];
}

export const defaultClientInformationListState: ClientInformationListState = {
  paginationParams: defaultPaginationParams,
  params: [],
};

export interface ClientInformationType {
  phoneClientVersion: string;
  validFrom: Date;
  validTo?: Date;
}

export interface ClientInformationInfoType extends ClientInformationRowType { }
