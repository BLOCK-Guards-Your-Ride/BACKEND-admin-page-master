import {
  defaultPaginationParams,
  ListState,
  OrdersType,
  OrderType,
  ParamsType,
} from './common';
import { PaginationParamsType } from './request';

export type OrganizationTypeType = 'PRIVATE_PERSON' | 'COMPANY' | 'OTHER';
export type OrganizationFieldType = 'NAME' | 'ORG_TYPE';

export const organizationTypes: OrganizationTypeType[] = [
  'PRIVATE_PERSON',
  'COMPANY',
  'OTHER',
];

export interface OrganizationRowType {
  id: number;
  name: string;
  slug: string;
  orgType: OrganizationTypeType;
  enabled: boolean;
}

export interface OrganizationRowListType {
  rows?: OrganizationRowType[];
}

export interface OrganizationOrdersType extends OrdersType {
  order: OrderType;
  field: OrganizationFieldType;
}

export interface OrganizationParamsType extends ParamsType {
  value: string;
  field: OrganizationFieldType;
}

export interface OrganizationListState extends ListState {
  paginationParams: PaginationParamsType;
  orders?: OrganizationOrdersType[];
  params?: OrganizationParamsType[];
}

export const defaultOrganiationListState: OrganizationListState = {
  paginationParams: defaultPaginationParams,
  params: [],
};

export interface OrganizationInfoType {
  name: string;
  orgType: OrganizationTypeType;
  id: number;
  enabled: boolean;
  slug: string;
}

export interface OrganizationType {
  name: string;
  orgType: OrganizationTypeType;
}

export interface OptionalOrganizationType {
  name?: string;
  orgType?: OrganizationTypeType;
  enabled?: boolean;
}
