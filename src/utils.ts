import { VueType } from './types'

export function getVueType(formattedFileContent: string[]): VueType {
    const scriptString = formattedFileContent.find((str) =>
        str.match(/<script.*>/g)
    )
    if (!scriptString) throw new Error('vue script section not found')
    const isTypescript = Boolean(scriptString.match(/lang="ts"/))
    const isVue2Compositon = Boolean(
        formattedFileContent.find((str) =>
            str.match(/defineComponent.*@vue\/composition-api/g)
        )
    )
    console.log('isTypescript', isTypescript)
    console.log('isVue2Compositon', isVue2Compositon)
    console.log('scriptString', scriptString)
    return 'vue-2'
}
