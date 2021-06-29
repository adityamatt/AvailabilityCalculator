import { APIManagement } from 'azure-react-icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { getIconSize } from '../../store/selectors/systemSelector'

export class SystemDesign {
  componentName: string
  availability: number
  children: Array<SystemDesign>
  iconName?: string
  isImportant: boolean

  constructor() {
    this.componentName = 'Root'
    this.availability = 100
    this.children = []
    this.isImportant = true
  }

  toJson = () => {
    //TODO
  }
  fromJson = () => {
    //TODO
  }

  getName = () => {
    return 'name'
  }

  renderIcon = () => {
    const iconSize = useSelector(getIconSize)
    //TODO

    return <APIManagement size={`${iconSize}`} className="SystemIcon" />
  }
}
