import { ts } from 'ts-morph'

const tsfile = ts.createSourceFile(
    '/src.tsx',
    `const a = {a:{b:2}}`,
    ts.ScriptTarget.ESNext,
    true,
    ts.ScriptKind.TSX
)
const files = { '/src.tsx': tsfile }
const compilerHost = {
    getSourceFile: (
        fileName: string,
        languageVersion: any,
        onError?: (message: string) => void
    ) => {
        return files[fileName]
    },
    getDefaultLibFileName: (defaultLibOptions) =>
        '/' + ts.getDefaultLibFileName(defaultLibOptions),
    writeFile: () => {
        // do nothing
    },
    getCurrentDirectory: () => '/',
    getDirectories: (path: string) => [],
    fileExists: (fileName: string) => files[fileName] != null,
    readFile: (fileName: string) =>
        files[fileName] != null ? files[fileName]!.getFullText() : undefined,
    getCanonicalFileName: (fileName: string) => fileName,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => '\n',
    getEnvironmentVariable: () => '',
}
const program = ts.createProgram(
    ['/src.tsx'],
    {
        strict: true,
        target: ts.ScriptTarget.ESNext,
        allowJs: true,
        module: ts.ModuleKind.ES2015,
    },
    compilerHost
)
const typeChecker = program.getTypeChecker()

ts.ScriptKind
