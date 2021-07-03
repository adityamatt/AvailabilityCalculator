import { SystemDesign } from '../types/SystemDesign'
import React from 'react'
import { Stack, Label, IStyle, PrimaryButton, IconButton, Link } from '@fluentui/react'
import { globalStackTokensXsmall } from '../globalStyles'
import {
  addDesignChild,
  editDesignComponent,
  removeDesignChildren,
  updateTraversePath,
} from '../../store/actions/systemActions'
import { useDispatch, useSelector } from 'react-redux'
import { getTraversePath } from '../../store/selectors/systemSelector'
import { AddChildModal } from './AddChildModal'
import { RemoveChildModal } from './RemoveChildModal'
import { EditSystemModal } from './EditSystemModal'

interface ISingleSystemIcon {
  design: SystemDesign
  isChild?: boolean
}
const getNewTraversePath = (existingPath: string[], newPath: string): string[] => {
  const output = [...existingPath]
  output.push(newPath)
  return output
}

export const SingleSystemIcon = (props: ISingleSystemIcon) => {
  const [isAddModalOpen, setIsAddModalOpen] = React.useState<boolean>(false)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = React.useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = React.useState<boolean>(false)

  const traversePath = useSelector(getTraversePath)

  const dispatch = useDispatch()
  const borderStyles: IStyle = {
    borderWidth: props.design.isImportant ? 3 : 1,
    borderStyle: props.design.isImportant ? 'solid' : 'dashed',
    borderRadius: 10,
    padding: 3,
  }
  return (
    <Stack styles={{ root: { width: 'fit-content' } }} grow>
      <Stack.Item styles={{ root: borderStyles }} align="center">
        {props.design.renderIcon()}
      </Stack.Item>

      <Stack.Item align="center">
        <Label>{`${props.design.getAvailability()}%`}</Label>
      </Stack.Item>
      <Stack.Item align="center" styles={{ root: { justifyContent: 'space-between' } }} grow>
        <Stack horizontal tokens={globalStackTokensXsmall} grow>
          {!props.isChild && (
            <Stack.Item>
              <IconButton
                iconProps={{ iconName: 'Add' }}
                onClick={() => {
                  setIsAddModalOpen(true)
                }}
              />
            </Stack.Item>
          )}
          <Stack.Item align="center">
            <Label>
              <Link
                underline
                disabled={!props.isChild}
                onClick={() => {
                  dispatch(updateTraversePath(getNewTraversePath(traversePath, props.design.componentName)))
                }}
              >{`${props.design.componentName}`}</Link>
            </Label>
          </Stack.Item>
          {!props.isChild && (
            <Stack.Item>
              <IconButton
                disabled={props.design.children.length === 0}
                iconProps={{ iconName: 'Remove' }}
                onClick={() => {
                  setIsRemoveModalOpen(true)
                }}
              />
            </Stack.Item>
          )}
        </Stack>
      </Stack.Item>
      <Stack.Item align="center">
        {!props.isChild && (
          <Stack.Item>
            <IconButton
              iconProps={{ iconName: 'Edit' }}
              onClick={() => {
                setIsEditModalOpen(true)
              }}
            />
          </Stack.Item>
        )}
      </Stack.Item>
      <Stack.Item>
        {isAddModalOpen && (
          <AddChildModal
            onAdd={(design: SystemDesign) => {
              dispatch(addDesignChild(design, traversePath))
            }}
            isOpen={isAddModalOpen}
            close={() => {
              setIsAddModalOpen(false)
            }}
          />
        )}
      </Stack.Item>
      <Stack.Item>
        {isRemoveModalOpen && (
          <RemoveChildModal
            parentSystem={props.design}
            onRemove={(removeNames: string[]) => {
              dispatch(removeDesignChildren(removeNames, traversePath))
            }}
            isOpen={isRemoveModalOpen}
            close={() => {
              setIsRemoveModalOpen(false)
            }}
          />
        )}
      </Stack.Item>
      <Stack.Item>
        {isEditModalOpen && (
          <EditSystemModal
            designToEdit={props.design}
            onEdit={(design: SystemDesign) => {
              dispatch(editDesignComponent(design, traversePath))
            }}
            isOpen={isEditModalOpen}
            close={() => {
              setIsEditModalOpen(false)
            }}
          />
        )}
      </Stack.Item>
    </Stack>
  )
}
