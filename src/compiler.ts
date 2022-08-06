import { ts } from 'ts-morph'

const FILE_PATH = '/src.tsx'

export function getCompiler(code: string) {
    const sourceFile = ts.createSourceFile(
        FILE_PATH,
        code,
        ts.ScriptTarget.ESNext,
        true,
        ts.ScriptKind.TSX
    )
    const files = { FILE_PATH: sourceFile }
    const compilerHost = {
        getSourceFile: (fileName: string) => {
            return files[fileName]
        },
        getDefaultLibFileName: (defaultLibOptions) =>
            '/' + ts.getDefaultLibFileName(defaultLibOptions),
        writeFile: () => {},
        getCurrentDirectory: () => '/',
        getDirectories: (path: string) => [],
        fileExists: (fileName: string) => files[fileName] != null,
        readFile: (fileName: string) =>
            files[fileName] != null
                ? files[fileName]!.getFullText()
                : undefined,
        getCanonicalFileName: (fileName: string) => fileName,
        useCaseSensitiveFileNames: () => true,
        getNewLine: () => '\n',
        getEnvironmentVariable: () => '',
    }
    const program = ts.createProgram(
        [FILE_PATH],
        {
            strict: true,
            target: ts.ScriptTarget.ESNext,
            allowJs: true,
            module: ts.ModuleKind.ES2015,
        },
        compilerHost
    )
    const typeChecker = program.getTypeChecker()
    return { sourceFile, typeChecker }
}
