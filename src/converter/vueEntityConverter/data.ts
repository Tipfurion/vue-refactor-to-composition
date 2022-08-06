import ts from 'typescript'
import { getNodeByKind, getNodeByName, getTypeFromNode } from '../../utils'

export function convertVueData(vueOptions: ts.Node, typeChecker) {
    const vueData = getNodeByKind(
        getNodeByName(vueOptions, 'data', 1),
        ts.SyntaxKind.ObjectLiteralExpression
    ) as any
    if (!vueData) return []
    return vueData.properties.map((element) => {
        if (ts.isShorthandPropertyAssignment(element)) {
            return {
                returning: [element.name.getText()],
                expression: null,
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
    })
}
