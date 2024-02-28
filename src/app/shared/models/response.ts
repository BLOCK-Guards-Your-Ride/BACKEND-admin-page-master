import {
  ClientInformationInfoType,
  ClientInformationRowListType,
} from './client-information';
import { QueryParamsType } from './common';
import { ConnectionMetadataInfoType } from './connection-metadata';
import { DockInfoType, StationDockQueryRowListType } from './dock';
import { FeedbackRowListType } from './feedback';
import { StationAssetQueryRowListType } from './image';
import {
  OrganizationInfoType,
  OrganizationRowListType,
} from './organization';
import { ParkingSessionRowListType } from './parking-session';
import { PLCMetadataInfoType } from './plc-metadata';
import {
  ErrorType,
  ViolationType,
} from './request';
import { SensorRowListType } from './sensor';
import {
  StationInfoType,
  StationQueryRowListType,
} from './station';
import {
  UserInfoType,
  UserRowListType,
} from './user';

export interface BaseResponse {
  meta: ResponseMetatype;
}

export interface ResponseMetatype {
  responseId: string;
  timestamp: Date;
}

export interface ViolationResponse {
  error: ErrorType;
  meta: ResponseMetatype;
  violationList?: ViolationType[];
}

// User Responses

export interface UserQueryResponse {
  meta: ResponseMetatype;
  list: UserRowListType;
  queryParams: QueryParamsType;
}

export interface UserResponse {
  meta: ResponseMetatype;
  user: UserInfoType;
}

export interface UserListResponse {
  meta: ResponseMetatype;
  list: UserRowListType;
}

export interface SensorListResponse {
  meta: ResponseMetatype;
  list: SensorRowListType;
}

// Station Responses

export interface StationQueryResponse {
  list: StationQueryRowListType;
  meta: ResponseMetatype;
  queryParams: QueryParamsType;
}

export interface StationResponse {
  meta: ResponseMetatype;
  station: StationInfoType;
}

export interface ParkingSessionQueryResponse {
  list: ParkingSessionRowListType;
  meta: ResponseMetatype;
  queryParams: QueryParamsType;
}

export interface PLCMetadataResponse {
  meta: ResponseMetatype;
  plcMetadata: PLCMetadataInfoType;
}

export interface ConnectionMetadataResponse {
  meta: ResponseMetatype;
  connectionMetadata: ConnectionMetadataInfoType;
}

export interface DockResponse {
  meta: ResponseMetatype;
  dock: DockInfoType;
}

export interface StationDockQueryResponse {
  list: StationDockQueryRowListType;
  meta: ResponseMetatype;
  queryParams: QueryParamsType;
}

export interface StationAssetQueryResponse {
  list: StationAssetQueryRowListType;
  meta: ResponseMetatype;
  queryParams: QueryParamsType;
}

// Feedback Responses

export interface FeedbackQueryResponse {
  list: FeedbackRowListType;
  meta: ResponseMetatype;
  queryParams: QueryParamsType;
}

// Client Information Responses

export interface ClientInformationQueryResponse {
  list: ClientInformationRowListType;
  meta: ResponseMetatype;
  queryParams: QueryParamsType;
}

export interface ClientInformationResponse {
  clientInformation: ClientInformationInfoType;
  meta: ResponseMetatype;
}

// Organization Responses

export interface OrganizationQueryResponse {
  meta: ResponseMetatype;
  queryParams: QueryParamsType;
  list: OrganizationRowListType;
}

export interface OrganizationResponse {
  meta: ResponseMetatype;
  organization: OrganizationInfoType;
}
