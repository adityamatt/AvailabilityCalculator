import { SystemDesign } from '../types/SystemDesign'
import React from 'react'
import { Stack, Label, IStyle } from '@fluentui/react'

interface ISingleSystemIcon {
  design: SystemDesign
}

export const SingleSystemIcon = (props: ISingleSystemIcon) => {
  const borderStyles: IStyle = { borderWidth: 3, borderStyle: 'solid', borderRadius: 10, padding: 3 }

  return (
    <Stack styles={{ root: { width: 'fit-content' } }}>
      <Stack.Item styles={props.design ? { root: borderStyles } : {}}>{props.design.renderIcon()}</Stack.Item>
      <Stack.Item align="center">
        <Label>{`${props.design.componentName}`}</Label>
      </Stack.Item>
      <Stack.Item align="center">
        <Label>{`Component Availalbility: ${props.design.availability}%`}</Label>
      </Stack.Item>
    </Stack>
  )
}
