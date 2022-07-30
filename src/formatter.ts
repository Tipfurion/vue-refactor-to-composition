import fs from 'fs'
import path from 'path'
import prettier from 'prettier'

export function getFormattedFileContent(filePath: string) {
    const file = fs.readFileSync(filePath)
    const formattedFileContent = prettier
        .format(file.toString(), {
            semi: true,
            parser: 'vue',
            printWidth: 150,
        })
        .split('\n')

    return formattedFileContent
}

//console.log(f.toString().split('\r\n'))
