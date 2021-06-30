import React from 'react'
import { Stack, Text } from '@fluentui/react'

interface ITraversePathHeader {
  traversePath: string[]
}
export const TraversePathHeader = (props: ITraversePathHeader) => {
  return (
    <Stack horizontal verticalAlign="center">
      {props.traversePath.map((_path: string) => {
        return <Text key={_path}>{`${_path}->`}</Text>
      })}
    </Stack>
  )
}
