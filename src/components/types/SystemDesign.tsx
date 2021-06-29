import { APIManagement } from 'azure-react-icons'
import React from 'react'

export class SystemDesign {
  componentName: string
  availability: number
  children: Array<SystemDesign>
  iconName?: string

  constructor() {
    this.componentName = 'Root'
    this.availability = 100
    this.children = []
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
    //TODO
    return <APIManagement size={'128'} className="SystemIcon" />
  }
}
