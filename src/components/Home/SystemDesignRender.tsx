import { SystemDesign } from '../types/SystemDesign'
import React from 'react'
import { Stack, IconButton, IStyle } from '@fluentui/react'
import { APIManagement } from 'azure-react-icons'
import { SingleSystemIcon } from './SingleSystemIcon'
import { SystemChildren } from './SystemChildrens'
import { globalStackTokensLarge } from '../globalStyles'
import { useSelector } from 'react-redux'
import { getTraversePath } from '../../store/selectors/systemSelector'

interface ISystemDesignRender {
  design: SystemDesign
}
const findSystemToRender = (path: string[], root: SystemDesign): SystemDesign => {
  if (path.length < 1) throw Error('Invalid system design architecture')
  if (path.length == 1 && path[0] == root.componentName) return root
  if (path[0] !== root.componentName) throw Error('Invalid Traversal')

  const child = root.children.find((component) => component.componentName === path[1])

  if (!child) throw Error('Invalid traversal')

  return findSystemToRender(path.slice(1), child)
}

export const SystemDesignRender = (props: ISystemDesignRender) => {
  const traversePath = useSelector(getTraversePath)

  const containerStyle: IStyle = {
    padding: 2,
    width: '100%',
    height: '100%',
  }

  let designToRender = props.design
  try {
    designToRender = findSystemToRender(traversePath, props.design)
  } catch (err) {}

  return (
    <Stack tokens={globalStackTokensLarge} verticalFill grow>
      <Stack.Item align="center">
        <SingleSystemIcon design={designToRender} />
      </Stack.Item>
      <Stack.Item align="center">
        <SystemChildren childrenSystemDesign={designToRender.children} />
      </Stack.Item>
    </Stack>
  )
}
