import { SystemDesign } from '../types/SystemDesign'
import React from 'react'
import { Stack, IconButton } from '@fluentui/react'
import { APIManagement } from 'azure-react-icons'
import { SingleSystemIcon } from './SingleSystemIcon'

interface ISystemDesignRender {
  design: SystemDesign
}
export const SystemDesignRender = (props: ISystemDesignRender) => {
  return (
    <Stack>
      <Stack.Item align="center">
        <SingleSystemIcon design={props.design} />
      </Stack.Item>
    </Stack>
  )
}
