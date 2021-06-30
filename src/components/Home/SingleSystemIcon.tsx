import { SystemDesign } from '../types/SystemDesign'
import React from 'react'
import { Stack, Label, IStyle, PrimaryButton, IconButton } from '@fluentui/react'
import { globalStackTokensXsmall } from '../globalStyles'

interface ISingleSystemIcon {
  design: SystemDesign
}

export const SingleSystemIcon = (props: ISingleSystemIcon) => {
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
          <Stack.Item>
            <IconButton iconProps={{ iconName: 'Add' }} />
          </Stack.Item>
          <Stack.Item align="center">
            <Label>{`${props.design.componentName}`}</Label>
          </Stack.Item>
          <Stack.Item>
            <IconButton iconProps={{ iconName: 'Remove' }} />
          </Stack.Item>
        </Stack>
      </Stack.Item>
    </Stack>
  )
}
