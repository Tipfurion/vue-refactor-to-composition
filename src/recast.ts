import * as recast from 'recast'
import { getFormattedFileContent } from './formatter'
import path from 'path'
// Let's turn this function declaration into a variable declaration.
const code = getFormattedFileContent(
    path.resolve(__dirname, './examples/Recast.ts')
)

// Parse the code using an interface similar to require("esprima").parse.
const ast = recast.parse(code.join('\n'))
const data = ast.program.body[0].declarations[0].init.properties
//console.dir(ast.program, { depth: 6 })
