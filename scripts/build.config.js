import builtins from 'rollup-plugin-node-builtins'
import resolve from '@rollup/plugin-node-resolve'
import common from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import { version } from '../package.json'

const defaultOption = {
    input: 'client/index.js',
    output: {
        banner: `/* chrome-remote-debugger version ${version} */`
    },
    plugins: [
        resolve({
            mainFields: ['jsnext', 'preferBuiltins', 'browser']
        }),
        builtins(),
        common(),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'runtime'
        })
    ]
}

const outputList = [
    {
        file: 'dist/crd.esm.js',
        format: 'es'
    },
    {
        file: 'dist/crd.cjs.js',
        format: 'cjs',
        exports: 'auto'
    },
    {
        file: 'dist/crd.umd.js',
        format: 'umd',
        name: 'CRD'
    }
]

export default outputList.map(output => {
    const isUMDMode = output.format === 'umd'
    const external = isUMDMode ? [] : ['socket.io-client', 'xhr', 'chobitsu']
    let globals = {}
    if (!isUMDMode) {
        external.forEach(key => (globals[key] = key))
    }
    return {
        ...defaultOption,
        output: { ...output, globals },
        external
    }
})
