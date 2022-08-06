import ts from 'typescript'
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
        scriptContent.length
    )

    return {
        exportStringIndex,
        startScriptStringIndex,
        endScriptStringIndex,
        scriptContent,
        vueScriptContent,
    }
}
export function getNodeByKind(
    node: ts.Node,
    kind: ts.SyntaxKind
): ts.Node | undefined {
    const find = (node: ts.Node): ts.Node | undefined => {
        return ts.forEachChild(node, (child) => {
            if (child.kind === kind) {
                return child
            }
            return find(child)
        })
    }
    return find(node)
}
export function getNodeByName(
    node: ts.Node,
    name: string,
    maxDepth?: number
): ts.Node | undefined {
    let depth = 0
    if (maxDepth === undefined) maxDepth = Number.MAX_SAFE_INTEGER
    const find = (node: ts.Node): ts.Node | undefined => {
        return ts.forEachChild(node, (child: any) => {
            depth++
            if (child?.name?.escapedText === name) {
                return child
            }
            return depth < maxDepth ? find(child) : undefined
        })
    }
    return find(node)
}
export function getTypeFromNode(
    node: ts.Node & { type: ts.TypeNode },
    typeChecker: ts.TypeChecker
): string {
    const type = typeChecker.getTypeFromTypeNode(node.type) as ts.Type & {
        intrinsicName: string
    }
    return (type?.aliasSymbol?.escapedName ?? type?.intrinsicName) as string
}
