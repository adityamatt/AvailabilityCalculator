import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'
export const getRandomGuid = (): string => {
  return uuidv4()
}

export function deepClone<T>(obj: T): T {
  return _.cloneDeep<T>(obj)
}
