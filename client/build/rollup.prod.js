import { terser } from 'rollup-plugin-terser'
import rollupConfig from './rollup.config'

const getDevOutput = baseOutput => ({
    ...baseOutput,
    file: `dist/crd.${
        baseOutput.format === 'es' ? 'esm' : baseOutput.format
    }.min.js`
})

export default rollupConfig.map(_ => ({
    ..._,
    output: getDevOutput(_.output),
    plugins: [..._.plugins, terser()]
}))
