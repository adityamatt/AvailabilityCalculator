import * as React from 'react'
import { INavLink, INavStyles, Nav } from '@fluentui/react'

interface INavBar {}
function _onLinkClick(ev?: React.MouseEvent<HTMLElement>, item?: INavLink) {
  if (item && item.name === 'News') {
    alert('News link clicked')
  }
}
const navStyles: Partial<INavStyles> = {
  root: {
    width: 208,
    height: 350,
    boxSizing: 'border-box',
    border: '1px solid #eee',
    overflowY: 'auto',
  },
}
export function NavBar(props: INavBar) {
  const LINKS = [
    { name: 'Home', url: '#/', key: 'homeKey', iconProps: { iconName: 'Home' } },
    { name: 'View', url: '#/view', key: 'viewKey', iconProps: { iconName: 'View' } },
    // { name: 'Contact', url: '#/contact', key: 'contactKey', iconProps: { iconName: 'Contact' } },
  ]

  return (
    <Nav
      onLinkClick={_onLinkClick}
      selectedKey="key3"
      ariaLabel="Nav basic example"
      styles={navStyles}
      groups={[{ links: LINKS }]}
    />
  )
}
