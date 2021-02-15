import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from '@rollup/plugin-replace';
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-css-only";
import { peerDependencies } from './package.json';
import typescript from "@rollup/plugin-typescript";

const external = Object.keys(peerDependencies);

const extensions = ['.js', '.jsx', '.tsx', '.ts'];

const commonConfig = {
    input: 'src/index',
    output: {
        name: 'rollupSample',
        sourcemap: true,
        file: 'dist/render/rollupSample.iife.js',
        format: 'iife'
    },
    // silent: true,
    context: 'window',
    watch: true,
    plugins: [
        resolve({
            extensions,
            customResolveOptions: {
                moduleDirectory: 'node_modules'
            }
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        babel({
            extensions,
            exclude: /node_modules/,
            babelHelpers: 'runtime',
        }),
        commonjs({
            requireReturnsDefault: false,
            include: /node_modules/,
            ignore: true
        }),
        css(),
        typescript({ exclude: /node_modules/ }),
    ]
}


const esmConfig = Object.assign({ external }, commonConfig);
esmConfig.output = Object.assign({}, commonConfig.output, {
    file: 'dist/mjs/rollupSample.mjs',
    format: 'esm',
    globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
    }
});
esmConfig.plugins = [
    ...commonConfig.plugins
];

// ESM prod config
const esmProdConfig = Object.assign({}, esmConfig);
esmProdConfig.output = Object.assign({}, esmConfig.output, {
    file: 'dist/mjs/rollupSample.min.mjs',
    sourcemap: false
});
esmProdConfig.plugins = [
    ...commonConfig.plugins,
    terser()
];

// UMD config
const umdConfig = Object.assign({
    external
}, commonConfig);
umdConfig.output = Object.assign({}, commonConfig.output, {
    file: 'dist/umd/rollupSample.js',
    format: 'umd',
    globals: {
        react: 'React',
        'react-dom': 'ReactDOM'
    }
});
umdConfig.plugins = [
    ...commonConfig.plugins
];

// Production config
const umdProdConfig = Object.assign({}, umdConfig);
umdProdConfig.output = Object.assign({}, umdConfig.output, {
    file: 'dist/umd/rollupSample.min.js',
    sourcemap: false
});
umdProdConfig.plugins = [
    ...commonConfig.plugins,
    terser()
];

let configurations = [esmConfig, esmProdConfig, umdConfig, umdProdConfig];
export default configurations;
