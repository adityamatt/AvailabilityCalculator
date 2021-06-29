import React from 'react'
import { mergeStyles, PrimaryButton, ScrollbarVisibility, Stack, ScrollablePane } from '@fluentui/react'
import { SystemDesign } from '../types/SystemDesign'
import { globalStackTokensXsmall, globalStackTokensMedium } from '../globalStyles'
import { SystemDesignRender } from './SystemDesignRender'

interface IHome {}

const iconClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  margin: '0 25px',
  borderWidth: 5,
})

export const Home = (props: IHome) => {
  const [system, setSystem] = React.useState<SystemDesign>(new SystemDesign())

  return (
    <Stack tokens={globalStackTokensXsmall} grow verticalFill>
      <Stack.Item>
        <Stack tokens={globalStackTokensMedium} horizontal>
          <Stack.Item>
            <PrimaryButton
              onClick={() => {
                setSystem(new SystemDesign())
              }}
              text="Reset"
            />
          </Stack.Item>
          <Stack.Item>
            <PrimaryButton
              iconProps={{ iconName: 'Download' }}
              onClick={() => {
                setSystem(new SystemDesign())
              }}
              text="Download"
            />
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
