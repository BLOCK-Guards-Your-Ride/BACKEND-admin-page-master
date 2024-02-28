import { PaginationParamsType } from './request';

export type OrderType = 'ASC' | 'DESC';

export const defaultDebounceTime = 500;
export const defaultSuccessDuartion = 1500;
export const defaultWarnDuartion = 4000;

export enum Permission {
  LOGIN = 'LOGIN',
  ANONYMUS = 'ANONYMUS',
  USER_MANAGEMENT = 'USER_MANAGEMENT',
  CURRENT_USER_MANAGEMENT = 'CURRENT_USER_MANAGEMENT',
  START_PARKING = 'START_PARKING',
  STOP_PARKING = 'STOP_PARKING',
  STATION_MANAGEMENT = 'STATION_MANAGEMENT',
  STATION_QUERY = 'STATION_QUERY',
  STATION_GROUP_MANAGEMENT = 'STATION_GROUP_MANAGEMENT',
  CONNECTION_METADATA_MANAGEMENT = 'CONNECTION_METADATA_MANAGEMENT',
  PLC_METADATA_MANAGEMENT = 'PLC_METADATA_MANAGEMENT',
  DOCK_MANAGEMENT = 'DOCK_MANAGEMENT',
  FEEDBACK_MANAGEMENT = 'FEEDBACK_MANAGEMENT',
  FEEDBACK_CREATION = 'FEEDBACK_CREATION',
  CLIENT_INFORMATION_MANAGEMENT = 'CLIENT_INFORMATION_MANAGEMENT',
  ORGANIZATION_MANAGEMENT = 'ORGANIZATION_MANAGEMENT',
  NOT_ALLOWED = 'NOT_ALLOWED',
}

export interface MenuItem {
  text: string;
  href?: string;
  permissions?: Permission[];
  subMenus?: MenuItem[];
}

export interface ContextMenuElement {
  text: string;
  icon: string;
  action: (...args: any[]) => any;
}

export const defaultPaginationParams: PaginationParamsType = {
  page: 0,
  rows: 10,
};

export interface QueryParamsType {
  totalRows: number;
}

export const routeNames = {
  login: 'bejelentkezes',
  plc_metadata: 'plc-metaadatok',
  connection_data: 'kapcsolodasi-adatok',
  dock_list: 'dokkok',
  sensor_list: 'szenzorok',
  image_list: 'fenykepek',
  metrics_list: 'metrikai-adatok',
  new_user: 'uj_felhasznalo',
  new_station: 'uj_allomas',
  new_client_information: 'uj_kliens-informacio',
  new_organization: 'uj_szervezet',
  view: 'reszletek',
};

export const moduleNames = {
  auth: 'auth',
  user: 'felhasznalok',
  station: 'allomasok',
  feedback: 'visszajelzesek',
  client_information: 'kliens-informaciok',
  organization: 'szervezetek',
};

export type FieldType = any;

export interface OrdersType {
  field: FieldType;
  order: OrderType;
}

export interface ParamsType {
  field: any;
  value: string;
}

export interface ListState {
  paginationParams: PaginationParamsType;
  orders?: OrdersType[];
  params?: ParamsType[];
}

export const defaultListState: ListState = {
  paginationParams: defaultPaginationParams,
}

export type SnackBarSuffix = 'SAVE' | 'CREATE';

export interface AutocompleteData {
  label: string;
  value: any;
}
