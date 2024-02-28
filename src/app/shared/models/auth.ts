import { RequestMetaType } from './request';
import { ResponseMetatype } from './response';

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginRequest extends LoginData {
  meta: RequestMetaType;
}

export interface LoginResponse {
  meta: ResponseMetatype;
  sessionId: string;
}
