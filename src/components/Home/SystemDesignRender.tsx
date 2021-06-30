import { SystemDesign } from '../types/SystemDesign'
import React from 'react'
import { Stack, IconButton, IStyle } from '@fluentui/react'
import { APIManagement } from 'azure-react-icons'
import { SingleSystemIcon } from './SingleSystemIcon'
import { SystemChildren } from './SystemChildrens'
import { globalStackTokensMedium } from '../globalStyles'

interface ISystemDesignRender {
  design: SystemDesign
}
export const SystemDesignRender = (props: ISystemDesignRender) => {
  const borderStyles: IStyle = {
    borderWidth: 1,
    borderStyle: 'dotted',
    borderRadius: 10,
    padding: 3,
    width: '100%',
  }

  return (
    <Stack styles={{ root: borderStyles }} tokens={globalStackTokensMedium} verticalFill grow>
      <Stack.Item align="center">
        <SingleSystemIcon design={props.design} />
      </Stack.Item>
      <Stack.Item align="center">
        <SystemChildren childrenSystemDesign={props.design.children} />
      </Stack.Item>
    </Stack>
  )
}
