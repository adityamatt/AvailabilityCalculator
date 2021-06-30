import { SystemDesign } from '../types/SystemDesign'
import React from 'react'
import { Stack, Label, IStyle, PrimaryButton } from '@fluentui/react'
import { globalStackTokensXsmall } from '../globalStyles'

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
        <Label>{`${props.design.availability}%`}</Label>
      </Stack.Item>
      <Stack.Item align="center">
        <Stack horizontal tokens={globalStackTokensXsmall}>
          <Stack.Item>
            <PrimaryButton text={'Add dependecy'} />
          </Stack.Item>
          <Stack.Item>
            <PrimaryButton text={'Remove dependecy'} />
          </Stack.Item>
        </Stack>
      </Stack.Item>
    </Stack>
  )
}
