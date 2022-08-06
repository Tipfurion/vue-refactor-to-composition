import path from 'path'
import { convertToComposition } from './converter/converter'

import { getFormattedFileContent } from './formatter'
import { getApiType, getScript } from './utils'

const formattedFilesContents = [
    './examples/Vue-2-ts.vue',
    //'./examples/Vue-2.vue',
    //'./examples/Vue-2-compostion-ts.vue',
].map((p) => ({
    path: p,
    content: getFormattedFileContent(path.resolve(__dirname, p)),
}))

formattedFilesContents.forEach((el) => {
    console.log('______________________________')
    console.log(`PATH: ${el.path}`)
    console.log(`API TYPE: ${JSON.stringify(getApiType(el.content))}`)
    const script = getScript(el.content)
    console.log('SCRIPT', script.vueScriptContent)
    console.log('______________________________')
    convertToComposition(script.vueScriptContent.join('\n'))
})
