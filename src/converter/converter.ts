import ts from 'typescript'
import { getCompiler } from '../compiler'
import { getNodeByKind, getNodeByName, getTypeFromNode } from '../utils'

export function convertToComposition(code: string) {
    const { sourceFile, typeChecker } = getCompiler(code)
    const vueOptions = getNodeByKind(
        sourceFile,
        ts.SyntaxKind.ObjectLiteralExpression
    )
    const vueData = getNodeByKind(
        getNodeByName(vueOptions, 'data', 1),
        ts.SyntaxKind.ObjectLiteralExpression
    ) as any
    console.log(
        'vueOptions',
        vueData.properties.map((element) => {
            if (ts.isShorthandPropertyAssignment(element)) {
                return {
                    returning: [element.name.getText()],
                    expression: ``,
                }
            } else if (ts.isPropertyAssignment(element)) {
                const expr = element.getChildAt(2)
                if (ts.isAsExpression(expr)) {
                    const name = (expr.parent as any).name.getText()
                    const value = expr.expression.getText()
                    const type = getTypeFromNode(expr, typeChecker)
                    return {
                        returning: [name],
                        expression: `const ${name} = ref<${type}>(${value})`,
                    }
                } else {
                    const name = (expr.parent as any).name.getText()
                    const value = (expr.parent as any).initializer.getText()
                    return {
                        returning: [name],
                        expression: `const ${name} = ref(${value})`,
                    }
                }
            }
            // const expr = element.getChildAt(2)
            //console.log('expr', expr)

            //if (!expr) return element.getFullText()
        })
    )
}
