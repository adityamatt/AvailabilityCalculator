import {
  Checkbox,
  DefaultButton,
  ICheckboxProps,
  IconButton,
  Modal,
  PrimaryButton,
  SpinButton,
  Stack,
  Text,
  TextField,
} from '@fluentui/react'
import { globalStackTokensLarge, globalStackTokensSmall, justifySpace } from '../globalStyles'
import React from 'react'
import { SystemDesign } from '../types/SystemDesign'
import { useSelector } from 'react-redux'
import { getSystem } from '../../store/selectors/systemSelector'

interface IEditSystemModal {
  isOpen: boolean
  close: () => void
  designToEdit: SystemDesign
  onEdit: (design: SystemDesign) => void
}

export const EditSystemModal = (props: IEditSystemModal) => {
  const systemDesign = useSelector(getSystem)
  const [name, setName] = React.useState<string>(props.designToEdit.componentName)
  const [avail, setAvail] = React.useState<number>(props.designToEdit.availability)
  const [instance, setInstance] = React.useState<number>(props.designToEdit.instance)
  const [isImportant, setIsImportant] = React.useState<boolean>(props.designToEdit.isImportant)

  const nameError = () => {
    if (name === props.designToEdit.componentName) return ''
    if (name === '') return 'Name cannot be empty'
    if (!systemDesign.isNameUnique(name)) return 'Name must be unique, given name already exists for another dependency'

    return ''
  }

  const disableEdit = (): boolean => {
    if (
      name === props.designToEdit.componentName &&
      avail === props.designToEdit.availability &&
      instance === props.designToEdit.instance &&
      isImportant === props.designToEdit.isImportant
    )
      return true

    return false
  }

  const onEdit = () => {
    const output = props.designToEdit.clone()
    output.componentName = name
    output.instance = instance
    output.availability = avail
    output.isImportant = output.isImportant

    props.onEdit(output)
    props.close()
  }
  return (
    <Modal isOpen={props.isOpen} onDismiss={props.close} isBlocking>
      <Stack tokens={globalStackTokensLarge} styles={{ root: { padding: 10 } }}>
        <Stack.Item key="Header">
          <Stack horizontal verticalAlign="center" styles={justifySpace}>
            <Stack.Item>
              <Text variant="xLargePlus">Edit Component</Text>
            </Stack.Item>
            <Stack.Item>
              <IconButton iconProps={{ iconName: 'ChromeClose' }} onClick={props.close} />
            </Stack.Item>
          </Stack>
        </Stack.Item>
        <Stack.Item key="Body" verticalFill grow styles={{ root: { minHeight: '60vh', minWidth: '50vw' } }}>
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
                  return (
                    <Text>
                      Is this Dependency breaking ? i.e If this service is down, the system is down as well(common
                      non-breaking dependecies are like Azure keyvaults)
                    </Text>
                  )
                }}
                onChange={(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
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
                disabled={disableEdit()}
                onClick={() => {
                  onEdit()
                }}
              >
                Edit Component
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
