#!/usr/bin/env node

import { readdirSync } from 'fs'
import finder from 'find-package-json'

const packageInfo = finder().next().value

const config = packageInfo['icon-import-generator']

const destination = config['destination']
const root = config['root']

const newLine = '\n'

const makeAvailableIconNames = (iconName: string) => {
  return `${iconName},${newLine}`
}

let content = 'export const availableDesignedIconNames = [\n'

const generateAvailableIconNames = () => {
  const iconFiles = readdirSync(root, { withFileTypes: true })

  iconFiles.forEach((_file) => {
    const fileName = _file.name.split('.')[0]

    content += makeAvailableIconNames(fileName)
  })

  content += '] as const'
}

generateAvailableIconNames()

console.log(content)
