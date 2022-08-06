import ts from 'typescript'
import { getCompiler } from '../compiler'
import { getNodeByKind, getNodeByName, getTypeFromNode } from '../utils'
import { convertVueData } from './vueEntityConverter/data'

export function convertToComposition(code: string) {
    const { sourceFile, typeChecker } = getCompiler(code)
    const vueOptions = getNodeByKind(
        sourceFile,
        ts.SyntaxKind.ObjectLiteralExpression
    )
    const convertedData = convertVueData(vueOptions, typeChecker)
    console.log('convertedData', convertedData)

    // const expr = element.getChildAt(2)
    //console.log('expr', expr)

    //if (!expr) return element.getFullText()
}
