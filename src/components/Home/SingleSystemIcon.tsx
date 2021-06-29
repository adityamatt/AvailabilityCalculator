import { SystemDesign } from '../types/SystemDesign'
import React from 'react'
import { Stack, Label, IStyle } from '@fluentui/react'

interface ISingleSystemIcon {
  design: SystemDesign
}

export const SingleSystemIcon = (props: ISingleSystemIcon) => {
  const borderStyles: IStyle = {
    borderWidth: 1,
    borderStyle: props.design.isImportant ? 'solid' : 'dashed',
    borderRadius: 10,
    padding: 3,
  }

  return (
    <Stack styles={{ root: { width: 'fit-content' } }}>
      <Stack.Item styles={{ root: borderStyles }} align="center">
        {props.design.renderIcon()}
      </Stack.Item>
      <Stack.Item align="center">
        <Label>{`${props.design.componentName}`}</Label>
      </Stack.Item>
      <Stack.Item align="center">
        <Label>{`Component Availalbility: ${props.design.availability}%`}</Label>
      </Stack.Item>
    </Stack>
  )
}
