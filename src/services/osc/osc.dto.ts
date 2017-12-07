interface EndPoint {
  httpPort?: number,
  httpUpdatesPort?: number,
  httpsPort?: number,
  httpsUpdatesPort?: number
}

export interface OscInfo {
  manufacturer: String,
  model: string,
  serialNumber: string,
  firmwareVersion: string,
  supportUrl: string,
  gps: boolean,
  gyro: boolean,
  uptime: number,
  api: string[],
  endpoints: EndPoint,
  apiLevel?: number[],
  [_vendorSpecific: string]: any
}

// interface State {
//   sessionId?: string,
//   batteryLevel?: number,
//   storageChanged?: boolean,
//   storageUri?: string,
//   [_vendorSpecific: string]: any
// }

// export interface OscState {
//   fingerprint?: string,
//   state?: State
// }
