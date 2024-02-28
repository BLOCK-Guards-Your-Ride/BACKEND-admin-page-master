import {
  defaultPaginationParams,
  ListState,
  OrdersType,
  OrderType,
  ParamsType,
} from './common';
import { PaginationParamsType } from './request';

export interface FeedbackRowType {
  creationDate: Date;
  description: string;
  fullName: string;
  rating: number;
}

export interface FeedbackRowListType {
  rows?: FeedbackRowType[];
}

export type FeedbackFieldType = 'USER_ID' | 'RATING' | 'CREATION_DATE';

export interface FeedbackOrdersType extends OrdersType {
  field: FeedbackFieldType;
  order: OrderType;
}

export interface FeedbackParamsType extends ParamsType {
  field: 'USER_ID' | 'RATING';
  value: string;
}

export interface FeedbackListState extends ListState {
  paginationParams: PaginationParamsType;
  orders?: FeedbackOrdersType[];
  params?: FeedbackParamsType[];
}

export const defaultFeedbackListState: FeedbackListState = {
  paginationParams: defaultPaginationParams,
  params: [],
};
