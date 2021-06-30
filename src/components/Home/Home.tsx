import React from 'react'
import {
  mergeStyles,
  PrimaryButton,
  ScrollbarVisibility,
  Stack,
  ScrollablePane,
  Dropdown,
  IDropdownOption,
  Label,
} from '@fluentui/react'
import { SystemDesign } from '../types/SystemDesign'
import { globalStackTokensXsmall, globalStackTokensMedium, globalStackTokensSmall } from '../globalStyles'
import { SystemDesignRender } from './SystemDesignRender'
import { useDispatch, useSelector } from 'react-redux'
import { getIconSize, getSystem, getTraversePath } from '../../store/selectors/systemSelector'
import { updateIconSize } from '../../store/actions/systemActions'
import { TraversePathHeader } from './TraversePathHeader'

interface IHome {}

const iconClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  margin: '0 25px',
  borderWidth: 5,
})

const iconSizeOptions: IDropdownOption[] = [
  {
    key: 128,
    text: '128',
  },
  {
    key: 96,
    text: '96',
  },
  {
    key: 72,
    text: '72',
  },
  {
    key: 36,
    text: '36',
  },
  {
    key: 24,
    text: '24',
  },
]

export const Home = (props: IHome) => {
  const system = useSelector(getSystem)

  const iconSize = useSelector(getIconSize)

  const dispatch = useDispatch()

  return (
    <Stack tokens={globalStackTokensXsmall} grow verticalFill>
      <Stack.Item>
        <Stack tokens={globalStackTokensMedium} horizontal verticalAlign="end">
          <Stack.Item>
            <PrimaryButton
              onClick={() => {
                //TODO
              }}
              text="Reset"
            />
          </Stack.Item>
          <Stack.Item>
            <PrimaryButton
              iconProps={{ iconName: 'Download' }}
              onClick={() => {
                //TODO
              }}
              text="Download"
            />
          </Stack.Item>
          <Stack.Item>
            <Stack horizontal tokens={globalStackTokensSmall}>
              <Stack.Item>
                <Label>Icon Size:</Label>
              </Stack.Item>
              <Stack.Item>
                <Dropdown
                  options={iconSizeOptions}
                  dropdownWidth="auto"
                  selectedKey={iconSize}
                  onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
                    if (!option) return

                    dispatch(updateIconSize(+option.key))
                  }}
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>
          <Stack.Item>
            <TraversePathHeader />
          </Stack.Item>
        </Stack>
      </Stack.Item>
      <Stack.Item styles={{ root: { position: 'relative' } }} grow verticalFill>
        <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
          <SystemDesignRender design={system} />
        </ScrollablePane>
      </Stack.Item>
    </Stack>
  )
}

export default Home
