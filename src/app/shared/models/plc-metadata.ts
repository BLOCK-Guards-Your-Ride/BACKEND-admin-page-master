export interface DockType {
  dockNr: number;
  enabled: boolean;
}

export interface PLCMetadataType {
  plcIdentifier: string;
  publicKey?: string;
  totalDocks?: number;
  dockList?: DockType[];
}

export interface PLCMetadataInfoType extends PLCMetadataType {
  plcMetadataId: number;
}
