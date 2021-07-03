import { DefaultButton, IconButton, Modal, PrimaryButton, Stack, Text, Checkbox } from '@fluentui/react'
import { SystemDesign } from '../types/SystemDesign'
import React from 'react'
import { globalStackTokensLarge, globalStackTokensSmall, justifySpace } from '../globalStyles'
import { getRandomGuid } from '../common/util'

interface IRemoveChildModal {
  isOpen: boolean
  close: () => void
  onRemove: (removeNames: string[]) => void
  parentSystem: SystemDesign
}

const createLabel = (system: SystemDesign): string => {
  return `${system.componentName} , ${system.getAvailability()}% , ${system.instance} instance(s) , ${
    system.children.length
  } dependencies`
}

export const RemoveChildModal = (props: IRemoveChildModal) => {
  const [removeChilds, setRemoveChilds] = React.useState<string[]>([])
  const disableAdd = (): boolean => {
    return false
  }

  const onRemove = () => {
    props.onRemove(removeChilds)
    props.close()
  }

  return (
    <Modal isOpen={props.isOpen} onDismiss={props.close} isBlocking>
      <Stack tokens={globalStackTokensLarge} styles={{ root: { padding: 10 } }}>
        <Stack.Item key="Header">
          <Stack horizontal verticalAlign="center" styles={justifySpace}>
            <Stack.Item>
              <Text variant="xLargePlus">Remove Dependencies</Text>
            </Stack.Item>
            <Stack.Item>
              <IconButton iconProps={{ iconName: 'ChromeClose' }} onClick={props.close} />
            </Stack.Item>
          </Stack>
        </Stack.Item>
        <Stack.Item key="Body" verticalFill grow styles={{ root: { minHeight: '60vh', minWidth: '50vw' } }}>
          <Stack tokens={globalStackTokensSmall}>
            {props.parentSystem.children.map((child: SystemDesign) => {
              return (
                <Stack.Item key={getRandomGuid()}>
                  <Checkbox
                    checked={removeChilds.find((key) => key === child.componentName) !== undefined}
                    label={createLabel(child)}
                    onChange={(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
                      if (checked) {
                        if (removeChilds.find((key) => key === child.componentName) !== undefined) return
                        setRemoveChilds([...removeChilds, child.componentName])
                      } else {
                        if (removeChilds.find((key) => key === child.componentName) === undefined) return
                        setRemoveChilds(removeChilds.filter((key) => key !== child.componentName))
                      }
                    }}
                  />
                </Stack.Item>
              )
            })}
          </Stack>
        </Stack.Item>
        <Stack.Item key="Footer">
          <Stack horizontal verticalAlign="center" styles={justifySpace}>
            <Stack.Item>
              <PrimaryButton
                disabled={disableAdd()}
                onClick={() => {
                  onRemove()
                }}
              >
                Remove Dependecies
              </PrimaryButton>
            </Stack.Item>
            <Stack.Item>
              <DefaultButton onClick={props.close}>Cancel</DefaultButton>
            </Stack.Item>
          </Stack>
        </Stack.Item>
      </Stack>
    </Modal>
  )
}
