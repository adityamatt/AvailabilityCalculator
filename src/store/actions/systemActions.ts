import { UPDATE_ICON_SIZE } from './actionTypes'
import { Dispatch } from 'redux'

export const updateIconSize = (payload: number) => ({
  type: UPDATE_ICON_SIZE,
  payload,
})
