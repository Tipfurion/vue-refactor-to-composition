import { ApiType, Script } from './types'

export function getApiType(formattedFileContent: string[]): ApiType {
    const startScriptString = formattedFileContent.find((str) =>
        str.match(/<script.*>/g)
    )
    if (!startScriptString) throw new Error('vue script section not found')
    const isTypescript = Boolean(startScriptString.match(/lang="ts"/))
    const isCompositon = Boolean(
        formattedFileContent.find((str) => str.match(/defineComponent/)) ||
            startScriptString.match('/setup/')
    )
    return { isCompositon, isTypescript }
}
export function getScript(formattedFileContent: string[]): Script {
    const startScriptStringIndex = formattedFileContent.findIndex((str) =>
        str.match(/<script.*>/g)
    )
    const endScriptStringIndex = formattedFileContent.findIndex((str) =>
        str.match(/<\/script>/g)
    )
    if (startScriptStringIndex < 0 || endScriptStringIndex < 0)
        throw new Error('script tag has invalid syntax')
    const scriptContent = formattedFileContent.slice(
        startScriptStringIndex + 1,
        endScriptStringIndex
    )
    const exportStringIndex = scriptContent.findIndex((str) =>
        str.match(/export default*/)
    )
    const vueScriptContent = scriptContent.slice(
        exportStringIndex,
        scriptContent.length - 1
    )
    const vueOptions = [...vueScriptContent].map((str, index) => {
        return index === 0
            ? str
                  .replace('export default', '') //vue2
                  .replace('defineComponent(', '') //vue-3 and vue-2-composition api
                  .replace('Vue.extend(', '') //vue-2 typescript
            : str
    })
    return {
        exportStringIndex,
        startScriptStringIndex,
        endScriptStringIndex,
        scriptContent,
        vueScriptContent,
        vueOptions,
    }
}
