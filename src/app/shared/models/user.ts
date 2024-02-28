import {
  defaultPaginationParams,
  ListState,
  OrdersType,
  OrderType,
  ParamsType,
  Permission,
} from './common';
import { PaginationParamsType } from './request';

export interface UserOrdersType extends OrdersType {
  field: UserFieldType;
  order: OrderType;
}

export type UserFieldType = 'NAME' | 'EMAIL' | 'PHONE_NUMBER';

export interface UserParamsType extends ParamsType {
  field: UserFieldType;
  value: string;
}

export interface UserRowType {
  email: string;
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface UserRowListType {
  rows?: UserRowType[];
}

export interface SecurityRoleType {
  name: string;
  roleIdentifier: Permission;
}

export type GenderType = 'MALE' | 'FEMALE' | 'OTHER';

export type SecurityGroup = 'USER' | 'ADMIN' | 'UNKNOWN' | 'PREMIUM' | 'STATION_ADMIN';

export interface UserInfoType {
  firstName: string;
  id: number;
  lastName: string;
  securityGroup: SecurityGroup;
  gender: GenderType;
  securityRoleList?: SecurityRoleType[];
  email: string;
  birthDate: Date;
  securityQuestion: string;
  securityAnswer: string;
  phoneNumber: string;
  privacyPolicyAccepted: boolean;
  parkingBalance: number;
}

export interface UserListState extends ListState {
  paginationParams: PaginationParamsType;
  orders?: UserOrdersType[];
  params?: UserParamsType[];
}

export interface UserWithSecurityGroupType {
  firstName: string;
  securityGroup: SecurityGroup;
  lastName: string;
  gender: GenderType;
  email: string;
  birthDate: Date;
  securityQuestion: string;
  securityAnswer: string;
  phoneNumber: string;
  privacyPolicyAccepcted: boolean;
  pargkinBalance?: number;
  password: string;
  organizationId?: number;
}

export const defaultUserListState: UserListState = {
  paginationParams: defaultPaginationParams,
  params: [],
};
