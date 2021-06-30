import { SystemDesign } from '../types/SystemDesign'
import React from 'react'
import { Stack, IconButton } from '@fluentui/react'
import { APIManagement } from 'azure-react-icons'
import { SingleSystemIcon } from './SingleSystemIcon'
import { getRandomGuid } from '../common/util'
import { globalStackTokensLarge } from '../globalStyles'
import { ArcherContainer, ArcherElement } from 'react-archer'

interface ISystemChildren {
  childrenSystemDesign: SystemDesign[]
}
export const SystemChildren = (props: ISystemChildren) => {
  return (
    <Stack horizontal tokens={globalStackTokensLarge} styles={{ root: { justifyContent: 'space-between' } }}>
      {props.childrenSystemDesign.map((item: SystemDesign, index: number) => {
        return (
          <Stack.Item key={getRandomGuid()}>
            <SingleSystemIcon design={item} isChild={true} />
          </Stack.Item>
        )
      })}
    </Stack>
  )
}
