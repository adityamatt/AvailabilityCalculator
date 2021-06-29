import { SystemDesign } from '../types/SystemDesign'
import React from 'react'
import { Stack, Label } from '@fluentui/react'

interface ISingleSystemIcon {
  design: SystemDesign
}

export const SingleSystemIcon = (props: ISingleSystemIcon) => {
  return (
    <Stack styles={{ root: { width: 'fit-content' } }}>
      <Stack.Item>{props.design.renderIcon()}</Stack.Item>
      <Stack.Item align="center">
        <Label>{`${props.design.componentName} %`}</Label>
        {/* <Label>{`Component Availalbility: ${props.design.availability}%`}</Label> */}
      </Stack.Item>
    </Stack>
  )
}
