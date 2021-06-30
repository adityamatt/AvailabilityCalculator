import { SystemDesign } from '../types/SystemDesign'
import React from 'react'
import { Stack, Label, IStyle, PrimaryButton, IconButton, Link } from '@fluentui/react'
import { globalStackTokensXsmall } from '../globalStyles'
import { updateTraversePath } from '../../store/actions/systemActions'
import { useDispatch, useSelector } from 'react-redux'
import { getTraversePath } from '../../store/selectors/systemSelector'

interface ISingleSystemIcon {
  design: SystemDesign
  isChild?: boolean
}
const getNewTraversePath = (existingPath: string[], newPath: string): string[] => {
  const output = [...existingPath]
  output.push(newPath)
  return output
}

export const SingleSystemIcon = (props: ISingleSystemIcon) => {
  const traversePath = useSelector(getTraversePath)

  const dispatch = useDispatch()
  const borderStyles: IStyle = {
    borderWidth: props.design.isImportant ? 3 : 1,
    borderStyle: props.design.isImportant ? 'solid' : 'dashed',
    borderRadius: 10,
    padding: 3,
  }
  return (
    <Stack styles={{ root: { width: 'fit-content' } }} grow>
      <Stack.Item styles={{ root: borderStyles }} align="center">
        {props.design.renderIcon()}
      </Stack.Item>

      <Stack.Item align="center">
        <Label>{`${props.design.availability}%`}</Label>
      </Stack.Item>
      <Stack.Item align="center" styles={{ root: { justifyContent: 'space-between' } }} grow>
        <Stack horizontal tokens={globalStackTokensXsmall} grow>
          {!props.isChild && (
            <Stack.Item>
              <IconButton iconProps={{ iconName: 'Add' }} />
            </Stack.Item>
          )}
          <Stack.Item align="center">
            <Label>
              <Link
                underline
                disabled={!props.isChild}
                onClick={() => {
                  //TODO
                  dispatch(updateTraversePath(getNewTraversePath(traversePath, props.design.componentName)))
                }}
              >{`${props.design.componentName}`}</Link>
            </Label>
          </Stack.Item>
          {!props.isChild && (
            <Stack.Item>
              <IconButton iconProps={{ iconName: 'Remove' }} />
            </Stack.Item>
          )}
        </Stack>
      </Stack.Item>
    </Stack>
  )
}
