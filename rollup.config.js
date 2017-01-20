import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    entry: 'src/index.js',
    moduleName: 'mvc',
    plugins: [
        babel(),
        nodeResolve({
            jsnext: true,
            main: true,
            preferBuiltins: false,
            browser: true,
            extensions: ['.js', '.json']
        }),
        commonjs({
            include: 'node_modules/**',
            extensions: ['.js', '.coffee'],
            sourceMap: true,
            ignoreGlobal: true,
        }),
    ],
    format: 'umd',
    dest: 'build/index.js',
    sourceMap: 'inline',
};
