import { ClientInformationOrdersType, ClientInformationParamsType, ClientInformationType } from './client-information';
import { ConnectionMetadataType } from './connection-metadata';
import {
  StationDockOrdersType,
  StationDockParamsType,
  StationDockType,
} from './dock';
import { FeedbackOrdersType, FeedbackParamsType } from './feedback';
import {
  OptionalOrganizationType,
  OrganizationOrdersType,
  OrganizationParamsType,
  OrganizationType,
} from './organization';
import { ParkingSessionOrdersType, ParkingSessionParamsType } from './parking-session';
import { PLCMetadataType } from './plc-metadata';
import {
  CoordinateParamsType,
  OptionalStationType,
  StationOrdersType,
  StationParamsType,
  StationType,
} from './station';
import {
  UserOrdersType,
  UserParamsType,
  UserWithSecurityGroupType,
} from './user';

export interface RequestMetaType {
  requestId: string;
  timestamp?: Date;
}

export interface ErrorType {
  cause: string;
  errorCode: string;
  excetion: string;
  message: string;
}

export interface ViolationType {
  field: string;
  message: string;
  type: 'REQUIRED' | 'CAN_NOT_BE_EMPTY' | 'NOT_VALID' | 'CUSTOM';
}

export interface PaginationParamsType {
  page: number;
  rows: number;
}

// User Requests

export interface UserQueryRequest {
  meta: RequestMetaType;
  orders?: UserOrdersType[];
  paginationParams: PaginationParamsType;
  params?: UserParamsType[];
}

export interface UserRequest {
  meta: RequestMetaType;
  user: UserWithSecurityGroupType;
}

// Station Requests

export interface StationQueryRequest {
  coordinateParams?: CoordinateParamsType;
  meta: RequestMetaType;
  orders?: StationOrdersType[];
  paginationParams: PaginationParamsType;
  params?: StationParamsType[];
}

export interface StationRequest {
  meta: RequestMetaType;
  station: StationType;
}

export interface OptionalStationRequest {
  meta: RequestMetaType;
  station: OptionalStationType;
}

export interface ParkingSessionQueryRequest {
  meta: RequestMetaType;
  orders?: ParkingSessionOrdersType[];
  paginationParams: PaginationParamsType;
  params?: ParkingSessionParamsType[];
}

export interface PLCMetadataRequest {
  meta: RequestMetaType;
  plcMetadata: PLCMetadataType;
}

export interface ConnectionMetadataRequest {
  meta: RequestMetaType;
  connectionMetadata: ConnectionMetadataType;
}

export interface DockRequest {
  meta: RequestMetaType;
  dock: StationDockType;
}

export interface StationDockQueryRequest {
  meta: RequestMetaType;
  orders?: StationDockOrdersType[];
  paginationParams: PaginationParamsType;
  params?: StationDockParamsType[];
}

// Feedback Requests

export interface FeedbackQueryRequest {
  meta: RequestMetaType;
  orders?: FeedbackOrdersType[];
  paginationParams: PaginationParamsType;
  params?: FeedbackParamsType[];
}

// Client Information Requests

export interface ClientInformationQueryRequest {
  meta: RequestMetaType;
  orders?: ClientInformationOrdersType[];
  paginationParams: PaginationParamsType;
  params?: ClientInformationParamsType[];
}

export interface ClientInformationRequest {
  clientInformation: ClientInformationType;
  meta: RequestMetaType;
}

// Organizations

export interface OrganizationQueryRequest {
  meta: RequestMetaType;
  orders?: OrganizationOrdersType[];
  params?: OrganizationParamsType[];
  paginationParams: PaginationParamsType;
}

export interface OrganizationRequest {
  meta: RequestMetaType;
  organization: OrganizationType;
}

export interface OrganizationPatchRequest {
  meta: RequestMetaType;
  organization: OptionalOrganizationType;
}
