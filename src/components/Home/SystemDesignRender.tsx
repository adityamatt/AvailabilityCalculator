import { SystemDesign } from '../types/SystemDesign'
import React from 'react'
import { Stack, Text } from '@fluentui/react'
import { SingleSystemIcon } from './SingleSystemIcon'
import { SystemChildren } from './SystemChildrens'
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

  let designToRender = props.design
  try {
    designToRender = findSystemToRender(traversePath, props.design)
  } catch (err) {}

  return (
    <Stack tokens={{ childrenGap: 30 }} verticalFill grow>
      <Stack.Item align="center">
        <SingleSystemIcon design={designToRender} />
      </Stack.Item>
      <Stack.Item align="center">
        <Text variant="large">Dependencies</Text>
      </Stack.Item>
      <Stack.Item>
        <SystemChildren childrenSystemDesign={designToRender.children} />
      </Stack.Item>
    </Stack>
  )
}
