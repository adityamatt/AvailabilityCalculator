import { AzAppServiceWebApp } from 'azure-react-icons'
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
  instance: number

  constructor(name?: string, avail?: number, isImportant?: boolean, instance?: number) {
    this.componentName = name ? name : 'Root'
    this.availability = avail ? avail : 100
    this.children = []
    this.isImportant = isImportant !== undefined ? isImportant : true
    this.instance = instance ? instance : 2
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

    return <AzAppServiceWebApp size={`${iconSize}`} className="SystemIcon" />
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

  getAvailability = (): number => {
    const instanceAvail = (1 - Math.pow(1 - this.availability / 100, this.instance)) * Math.pow(100, this.instance - 1)

    if (this.children.length === 0) return instanceAvail
    const importantChildrenAvailability: number[] = this.children
      .filter((_item) => _item.isImportant)
      .map((_item) => _item.getAvailability())

    if (importantChildrenAvailability.length === 0) return instanceAvail
    const minBlocker = Math.min.apply(Math, [...importantChildrenAvailability])
    return (instanceAvail * minBlocker) / 100
  }
  isNameUnique = (name: string): boolean => {
    if (this.componentName.toLocaleLowerCase() === name.toLocaleLowerCase()) return false
    let i = 0
    while (i < this.children.length) {
      const childMatch = this.children[i].isNameUnique(name)
      if (!childMatch) return false
      i += 1
    }

    return true
  }
}
