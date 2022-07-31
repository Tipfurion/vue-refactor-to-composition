import * as recast from 'recast'
import * as recastTsParser from 'recast/parsers/typescript'
import { getFormattedFileContent } from './formatter'
import path from 'path'
// Let's turn this function declaration into a variable declaration.
const code = getFormattedFileContent(
    path.resolve(__dirname, './examples/Recast.ts')
)

// Parse the code using an interface similar to require("esprima").parse.
const ast = recast.parse(code.join('\n'), {
    parser: recastTsParser,
})
const data = ast.program.body[0].declarations[0].init.properties.find(
    (property: any) => property.key.name === 'data'
)
console.dir(data.value.body.body[0].argument.properties[0].value.expression)

//console.dir(ast.program, { depth: 6 })
