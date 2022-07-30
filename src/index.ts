import path from 'path'
import { getFormattedFileContent } from './formatter'
import { getVueType } from './utils'

const formattedFilesContents = [
    './examples/Vue-2-ts.vue',
    './examples/Vue-2.vue',
    './examples/Vue-2-compostion-ts.vue',
].map((p) => ({
    path: p,
    content: getFormattedFileContent(path.resolve(__dirname, p)),
}))

formattedFilesContents.forEach((el) => {
    console.log('______________________________')
    console.log(`PATH: ${el.path}`)
    console.log(`VUE TYPE: ${getVueType(el.content)}`)
    console.log('______________________________')
})
