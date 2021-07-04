import { AzAppServiceWebApp } from 'azure-react-icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { getIconSize } from '../../store/selectors/systemSelector'
import { deepClone } from '../common/util'
import Joi from 'joi'
export interface ISystemDesignJSON {
  name: string
  availability: number
  isImportant: boolean
  iconName?: string
  instance: number
  children: ISystemDesignJSON[]
}

export const JSONObjectSchema: Joi.ObjectSchema = Joi.object({
  name: Joi.string().min(1),
  availability: Joi.number().min(0.0).max(100.0),
  isImportant: Joi.bool(),
  iconName: Joi.string().optional(),
  instance: Joi.number().integer().min(1),
  children: Joi.array().items(Joi.link('#design')),
}).id('design')

const getNames = (design: ISystemDesignJSON): string[] => {
  let childrenNames: string[] = []

  if (!design.children) return []
  design.children.forEach((child) => {
    childrenNames = [...childrenNames, ...getNames(child)]
  })
  return [design.name, ...childrenNames]
}

function hasDuplicates(array: any[]) {
  return new Set(array).size !== array.length
}

export const isValidJson = (json: any): string => {
  try {
    JSONObjectSchema.validate(json)

    const names: string[] = getNames(json)

    if (hasDuplicates(names)) return 'System has duplicate names'

    return ''
  } catch (err) {
    return err.message
  }
}

export const CreateSystemDesignFromJson = (object: ISystemDesignJSON): SystemDesign => {
  const output = new SystemDesign(object.name, object.availability, object.isImportant, object.instance)
  output.children = object.children.map((_itm) => CreateSystemDesignFromJson(_itm))
  return output
}

export class SystemDesign {
  componentName: string
  availability: number
  children: Array<SystemDesign>
  iconName?: string
  isImportant: boolean
  instance: number

  constructor(name?: string, avail?: number, isImportant?: boolean, instance?: number) {
    this.componentName = name ? name : 'root'
    this.availability = avail ? avail : 100
    this.children = []
    this.isImportant = isImportant !== undefined ? isImportant : true
    this.instance = instance ? instance : 2
  }

  toJSON = (): ISystemDesignJSON => {
    return {
      name: this.componentName,
      availability: this.availability,
      isImportant: this.isImportant,
      iconName: this.iconName,
      instance: this.instance,
      children: this.children.map((_design) => _design.toJSON()),
    }
  }
  fromJSON = (jsonObject: any) => {
    try {
      const output = isValidJson(jsonObject)
      if (output) throw Error(output)

      const copyFrom = CreateSystemDesignFromJson(jsonObject)
      this.componentName = copyFrom.componentName
      this.instance = copyFrom.instance
      this.isImportant = copyFrom.isImportant
      this.availability = copyFrom.availability
      this.children = [...copyFrom.children]
    } catch (err) {
      throw Error('Invalid Json content')
    }
  }

  renderIcon = () => {
    const iconSize = useSelector(getIconSize)
    //TODO

    return <AzAppServiceWebApp size={`${iconSize}`} className="SystemIcon" />
  }
  addChild = (item: SystemDesign, path: string[]): SystemDesign => {
    if (path.length < 1) throw Error('Invalid system design architecture')
    if (path.length == 1 && path[0].toLowerCase() === this.componentName.toLowerCase()) {
      const output = this.clone()
      output.children.push(item)
      return output
    }
    if (path[0] !== this.componentName) throw Error('Invalid Traversal')
    const childIndex = this.children.findIndex((component) => component.componentName === path[1])

    if (childIndex == -1) throw Error('Invalid traversal')
    this.children[childIndex] = this.children[childIndex].addChild(item, path.slice(1))

    return this
  }
  removeChild = (removeNames: string[], path: string[]) => {
    if (path.length < 1) throw Error('Invalid system design architecture')
    if (path.length == 1 && path[0].toLowerCase() === this.componentName.toLowerCase()) {
      this.children = this.children.filter((valid) => {
        return removeNames.find((_exists) => _exists.toLowerCase() === valid.componentName.toLowerCase()) === undefined
      })

      return
    }
    if (path[0] !== this.componentName) throw Error('Invalid Traversal')
    const childIndex = this.children.findIndex((component) => component.componentName === path[1])

    if (childIndex == -1) throw Error('Invalid traversal')
    this.children[childIndex].removeChild(removeNames, path.slice(1))
  }
  edit = (design: SystemDesign, path: string[]) => {
    if (path.length < 1) throw Error('Invalid system design architecture')
    if (path.length == 1 && path[0].toLowerCase() === this.componentName.toLowerCase()) {
      this.availability = design.availability
      this.isImportant = design.isImportant
      this.componentName = design.componentName
      this.instance = design.instance

      return
    }
    if (path[0] !== this.componentName) throw Error('Invalid Traversal')
    const childIndex = this.children.findIndex((component) => component.componentName === path[1])

    if (childIndex == -1) throw Error('Invalid traversal')
    this.children[childIndex].edit(design, path.slice(1))
  }
  clone = (): SystemDesign => {
    const output = new SystemDesign()
    output.componentName = this.componentName
    output.availability = this.availability
    output.iconName = this.iconName
    output.isImportant = this.isImportant
    output.instance = this.instance
    output.children = this.children.map((_itm) => _itm.clone())

    return output
  }

  getAvailability = (): number => {
    const instanceAvail = (1 - Math.pow(1 - this.availability / 100, this.instance)) * 100

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
