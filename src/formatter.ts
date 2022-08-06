import fs from 'fs'
import path from 'path'
import prettier from 'prettier'

export function getFormattedFileContent(filePath: string) {
    const file = fs.readFileSync(filePath)
    const formattedFileContent = prettier
        .format(file.toString(), {
            semi: false,
            parser: 'vue',
            printWidth: 150,
            trailingComma: 'none',
        })
        .split('\n')

    return formattedFileContent
}
