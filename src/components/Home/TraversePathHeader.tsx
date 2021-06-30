import React from 'react'
import { Stack, Text, Link } from '@fluentui/react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTraversePath } from '../../store/actions/systemActions'
import { getTraversePath } from '../../store/selectors/systemSelector'
import { globalStackTokensSmall } from '../globalStyles'

interface ITraversePathHeader {}
export const TraversePathHeader = (props: ITraversePathHeader) => {
  const dispatch = useDispatch()

  const traversePath = useSelector(getTraversePath)

  const isLast = (path: string): boolean => {
    return path === traversePath[traversePath.length - 1]
  }
  const getNewTraversePath = (path: string): string[] => {
    let i = 0
    const output: string[] = []
    while (i < traversePath.length && traversePath[i] !== path) {
      output.push(traversePath[i])
      i += 1
    }
    output.push(traversePath[i])

    return output
  }

  return (
    <Stack horizontal verticalAlign="center" tokens={globalStackTokensSmall}>
      {traversePath.map((_path: string) => {
        return (
          <Text key={_path}>
            <Stack tokens={globalStackTokensSmall} horizontal>
              <Stack.Item>
                <Link
                  underline
                  disabled={isLast(_path)}
                  onClick={() => {
                    dispatch(updateTraversePath(getNewTraversePath(_path)))
                  }}
                >
                  {`${_path}`}
                </Link>
              </Stack.Item>
              <Stack.Item>{!isLast(_path) && `${'->'}`}</Stack.Item>
            </Stack>
          </Text>
        )
      })}
    </Stack>
  )
}
