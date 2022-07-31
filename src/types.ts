export interface ApiType {
    isCompositon: boolean
    isTypescript: boolean
}
export interface Script {
    exportStringIndex: number
    startScriptStringIndex: number
    endScriptStringIndex: number
    scriptContent: string[]
    vueScriptContent: string[]
    vueOptions: string[]
}
