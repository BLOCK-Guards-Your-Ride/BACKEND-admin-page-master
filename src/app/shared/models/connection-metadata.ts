export interface ConnectionMetadataType {
  apiVersion: string;
  authenticationData?: string;
  host: string;
  port?: number;
}

export interface ConnectionMetadataInfoType extends ConnectionMetadataType {
  id: number;
}
