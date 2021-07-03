import { SystemDesign } from '../types/SystemDesign'
import React from 'react'
import {
  Stack,
  Modal,
  Text,
  IconButton,
  PrimaryButton,
  DefaultButton,
  TextField,
  SpinButton,
  Checkbox,
  ICheckboxProps,
} from '@fluentui/react'
import { globalStackTokensLarge, globalStackTokensSmall, justifySpace } from '../globalStyles'
import { getSystem } from '../../store/selectors/systemSelector'
import { useSelector } from 'react-redux'

interface IAddChildModal {
  isOpen: boolean
  close: () => void
  onAdd: (design: SystemDesign) => void
}
export const AddChildModal = (props: IAddChildModal) => {
  const systemDesign = useSelector(getSystem)
  const [name, setName] = React.useState<string>('')
  const [avail, setAvail] = React.useState<number>(99.99)
  const [instance, setInstance] = React.useState<number>(1)
  const [isImportant, setIsImportant] = React.useState<boolean>(false)

  const nameError = () => {
    if (name === '') return 'Name cannot be empty'
    if (!systemDesign.isNameUnique(name)) return 'Name must be unique, given name already exists for another dependency'

    return ''
  }

  const disableAdd = (): boolean => {
    if (nameError()) return true

    return false
  }

  const onAdd = () => {
    const design = new SystemDesign(name, avail, isImportant, instance)
    props.onAdd(design)
    props.close()
  }
  return (
    <Modal isOpen={props.isOpen} onDismiss={props.close} isBlocking>
      <Stack tokens={globalStackTokensLarge} styles={{ root: { padding: 10 } }}>
        <Stack.Item key="Header">
          <Stack horizontal verticalAlign="center" styles={justifySpace}>
            <Stack.Item>
              <Text variant="xLargePlus">Add Dependency</Text>
            </Stack.Item>
            <Stack.Item>
              <IconButton iconProps={{ iconName: 'ChromeClose' }} onClick={props.close} />
            </Stack.Item>
          </Stack>
        </Stack.Item>
        <Stack.Item key="Body" verticalFill grow styles={{ root: { height: '60vh' } }}>
          <Stack tokens={globalStackTokensSmall}>
            <Stack.Item>
              <TextField
                value={name}
                label="Name"
                errorMessage={nameError()}
                onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                  if (newValue === undefined) return

                  setName(newValue)
                }}
              />
            </Stack.Item>
            <Stack.Item>
              <SpinButton
                label="Instances in Parallel"
                value={`${instance}`}
                min={1}
                max={100}
                step={1}
                onChange={(event: React.SyntheticEvent<HTMLElement>, newValue?: string) => {
                  if (!newValue) return
                  setInstance(+newValue)
                }}
              />
            </Stack.Item>
            <Stack.Item>
              <SpinButton
                label="Availability of Single Instance"
                value={`${avail}`}
                min={1}
                max={100}
                step={0.01}
                onChange={(event: React.SyntheticEvent<HTMLElement>, newValue?: string) => {
                  if (!newValue) return
                  setAvail(+newValue)
                }}
              />
            </Stack.Item>
            <Stack.Item>
              <Checkbox
                onRenderLabel={(props?: ICheckboxProps) => {
                  //TODO
                  return (
                    <Text>
                      Is this Dependency breaking ? i.e If this service is down, the system is down as well(common
                      non-breaking dependecies are like Azure keyvaults)
                    </Text>
                  )
                }}
                onChange={(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
                  //TODO
                  if (checked) setIsImportant(true)
                  else setIsImportant(false)
                }}
                checked={isImportant}
              />
            </Stack.Item>
          </Stack>
        </Stack.Item>
        <Stack.Item key="Footer">
          <Stack horizontal verticalAlign="center" styles={justifySpace}>
            <Stack.Item>
              <PrimaryButton
                disabled={disableAdd()}
                onClick={() => {
                  onAdd()
                }}
              >
                Add Dependency
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
