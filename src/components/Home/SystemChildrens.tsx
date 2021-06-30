import { SystemDesign } from '../types/SystemDesign'
import React from 'react'
import { Stack, IconButton } from '@fluentui/react'
import { APIManagement } from 'azure-react-icons'
import { SingleSystemIcon } from './SingleSystemIcon'
import { getRandomGuid } from '../common/util'
import { globalStackTokensSmall } from '../globalStyles'

interface ISystemChildren {
  childrenSystemDesign: SystemDesign[]
}
export const SystemChildren = (props: ISystemChildren) => {
  return (
    <Stack horizontal tokens={globalStackTokensSmall}>
      {props.childrenSystemDesign.map((item: SystemDesign) => {
        return (
          <Stack.Item key={getRandomGuid()}>
            <SingleSystemIcon design={item} />
          </Stack.Item>
        )
      })}
    </Stack>
  )
}