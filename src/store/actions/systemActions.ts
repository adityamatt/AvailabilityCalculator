import { UPDATE_ICON_SIZE, UPDATE_TRAVERSE_PATH } from './actionTypes'
import { Dispatch } from 'redux'

export const updateIconSize = (payload: number) => ({
  type: UPDATE_ICON_SIZE,
  payload,
})

export const updateTraversePath = (payload: string[]) => ({
  type: UPDATE_TRAVERSE_PATH,
  payload,
})
