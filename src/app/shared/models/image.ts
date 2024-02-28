export interface StationAssetQueryRowType {
  id: string;
  requestId: string;
  object: string;
  url: string;
  creationDate: string;
}

export interface StationAssetQueryRowListType {
  rows?: StationAssetQueryRowType[];
}
