import { APIManagement } from 'azure-react-icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { getIconSize } from '../../store/selectors/systemSelector'
import { deepClone } from '../common/util'

export class SystemDesign {
  componentName: string
  availability: number
  children: Array<SystemDesign>
  iconName?: string
  isImportant: boolean

  constructor(name?: string, avail?: number, isImportant?: boolean) {
    this.componentName = name ? name : 'Root'
    this.availability = avail ? avail : 100
    this.children = []
    this.isImportant = isImportant !== undefined ? isImportant : true
  }

  toJson = () => {
    //TODO
  }
  fromJson = () => {
    //TODO
  }

  renderIcon = () => {
    const iconSize = useSelector(getIconSize)
    //TODO

    return <APIManagement size={`${iconSize}`} className="SystemIcon" />
  }
  addChild = (item: SystemDesign) => {
    if (this.children.find((_item) => _item.componentName.toLowerCase() === _item.componentName.toLowerCase())) {
      // throw Error('Existing Child with same name exists')
    }
    this.children.push(item)
  }
  removeChild = (item: SystemDesign) => {
    this.children = this.children.filter((_item) => {
      return _item.componentName.toLowerCase() !== item.componentName.toLowerCase()
    })
  }
  clone = (): SystemDesign => {
    return deepClone(this)
  }
}
