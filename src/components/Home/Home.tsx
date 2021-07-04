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
  MessageBar,
  MessageBarType,
} from '@fluentui/react'
import { SystemDesign } from '../types/SystemDesign'
import { globalStackTokensXsmall, globalStackTokensMedium, globalStackTokensSmall } from '../globalStyles'
import { SystemDesignRender } from './SystemDesignRender'
import { useDispatch, useSelector } from 'react-redux'
import { getIconSize, getSystem, getSystemError, getTraversePath } from '../../store/selectors/systemSelector'
import { resetError, resetSystem, updateIconSize } from '../../store/actions/systemActions'
import { TraversePathHeader } from './TraversePathHeader'
import { UploadFile } from './UploadFile'

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
  const iconSize = useSelector(getIconSize)
  const error = useSelector(getSystemError)
  const system = useSelector(getSystem)

  const inputFile = React.useRef(null)
  const dispatch = useDispatch()
  return (
    <Stack tokens={globalStackTokensXsmall} grow verticalFill>
      <Stack.Item id="ERROR MESSAGE">
        {error && (
          <MessageBar
            messageBarType={MessageBarType.error}
            onDismiss={() => {
              dispatch(resetError())
            }}
          >
            {error}
          </MessageBar>
        )}
      </Stack.Item>
      <Stack.Item id="Actions">
        <Stack tokens={globalStackTokensMedium} horizontal verticalAlign="end">
          <Stack.Item>
            <PrimaryButton
              onClick={() => {
                dispatch(resetSystem())
              }}
              text="Reset"
            />
          </Stack.Item>
          <Stack.Item>
            <PrimaryButton
              href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(system.toJSON()))}`}
              iconProps={{ iconName: 'Download' }}
              download="system.json"
              text="Download"
            />
          </Stack.Item>
          <Stack.Item>
            <UploadFile />
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
      <Stack.Item styles={{ root: { position: 'relative' } }} grow verticalFill id="Design">
        <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
          <SystemDesignRender />
        </ScrollablePane>
      </Stack.Item>
    </Stack>
  )
}

export default Home
