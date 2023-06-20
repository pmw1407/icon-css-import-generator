#!/usr/bin/env node

import finder from 'find-package-json'
import { readdirSync, writeFileSync } from 'fs'

const packageInfo = finder().next().value

const config = packageInfo['icon-import-generator']

const destination = config['destination']
const root = config['root']

const newLine = '\n'

const makeAvailableIconNames = (iconName: string, isNewLine: boolean) => {
  return isNewLine ? `'${iconName},${newLine}'` : `'${iconName}',`
}

const generateAvailableIconNames = () => {
  let content = 'export const availableDesignedIconNames = [\n'

  const iconFiles = readdirSync(root, { withFileTypes: true })

  iconFiles.forEach((_file) => {
    const fileName = _file.name.split('.')[0]

    content += makeAvailableIconNames(fileName, true)
  })

  content += '] as const'

  return content
}

const generateAvailableIconNameCss = () => {
  let content = '$iconNames: '

  const iconFiles = readdirSync(root, { withFileTypes: true })

  iconFiles.forEach((_file) => {
    const fileName = _file.name.split('.')[0]

    content += makeAvailableIconNames(fileName, false)
  })

  content += ';'

  return content
}

const availableIconNames = generateAvailableIconNames()
const availableIconNameCss = generateAvailableIconNameCss()
console.log(availableIconNames, availableIconNameCss)

writeFileSync(`${destination}/AvailableIconNames.ts`, availableIconNames)
writeFileSync(`${destination}/AvailableIconNameCss.ts`, availableIconNameCss)
