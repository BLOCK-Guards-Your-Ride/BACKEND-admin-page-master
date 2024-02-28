import { get, omit } from 'lodash';

export const getObjectWithoutId = function<T extends object>(data: T): Partial<T> {
  return omit(data, ['id']);
}

export const getObject = (source: any, path: string[]) => {
  return get(source, path, {});
}