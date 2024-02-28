import { ResponseMetatype } from './response';

export interface MetricType {
  metricType: string;
  metricStatus: string;
  message: string;
}

export interface MetricListType {
  rows?: MetricType[];
}

export class StationStatusType {
  stationQrCode: string;
  metricList: MetricListType;
}

export class StationMetricResponse {
  meta: ResponseMetatype;
  stationStatus: StationStatusType;
}
