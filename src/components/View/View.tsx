import React, { Component, Fragment } from 'react'
import { DefaultButton, Stack } from '@fluentui/react'
import Tree from 'react-d3-tree'
import { CustomNodeElementProps, RawNodeDatum } from 'react-d3-tree/lib/types/common'
import { globalStackTokensXsmall } from '../globalStyles'
import { useSelector } from 'react-redux'
import { getSystem } from '../../store/selectors/systemSelector'
import { SystemDesign } from '../types/SystemDesign'
import { APIManagement } from 'azure-react-icons'

interface IView {}
const convertToTree = (system: SystemDesign): RawNodeDatum => {
  return {
    name: system.componentName,
    attributes: {
      avail: `${system.getAvailability()}%`,
      name: system.componentName,
    },
    children: [
      ...system.children.map((_item) => {
        return convertToTree(_item)
      }),
    ],
  }
}

export const View = (props: IView) => {
  // const [selectedNode, setSelectedNode] = React.useState<>()
  const system = useSelector(getSystem)

  const orgChart: RawNodeDatum = convertToTree(system)
  return (
    <Stack tokens={globalStackTokensXsmall} grow verticalFill verticalAlign="center" horizontalAlign="center">
      <Stack.Item>Title</Stack.Item>
      <Stack.Item
        grow
        verticalFill
        styles={{ root: { width: '100%', height: '100%', borderWidth: 3, borderStyle: 'solid' } }}
      >
        <Tree data={orgChart} zoom={1} orientation="vertical" nodeSize={{ x: 400, y: 400 }} />
      </Stack.Item>
    </Stack>
  )
}

export default View
