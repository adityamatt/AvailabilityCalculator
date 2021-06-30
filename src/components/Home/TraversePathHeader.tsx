import React from 'react'
import { Stack, Text, Link } from '@fluentui/react'
import { useDispatch } from 'react-redux'
import { updateTraversePath } from '../../store/actions/systemActions'

interface ITraversePathHeader {
  traversePath: string[]
}
export const TraversePathHeader = (props: ITraversePathHeader) => {
  const dispatch = useDispatch()

  const isLast = (path: string): boolean => {
    return path === props.traversePath[props.traversePath.length - 1]
  }
  const getNewTraversePath = (path: string): string[] => {
    let i = 0
    const output: string[] = []
    while (i < props.traversePath.length && props.traversePath[i] !== path) {
      output.push(props.traversePath[i])
      i += 1
    }
    output.push(props.traversePath[i])

    return output
  }

  return (
    <Stack horizontal verticalAlign="center">
      {props.traversePath.map((_path: string) => {
        return (
          <Text key={_path}>
            <Link
              disabled={isLast(_path)}
              onClick={() => {
                dispatch(updateTraversePath(getNewTraversePath(_path)))
              }}
            >
              {`${_path}`}
              {!isLast(_path) && `${'->'}`}
            </Link>
          </Text>
        )
      })}
    </Stack>
  )
}
