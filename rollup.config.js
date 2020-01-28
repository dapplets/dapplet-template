import typescript from '@rollup/plugin-typescript';
import image from '@rollup/plugin-image';

export default [{
    input: 'src/index.ts',
    output: [{
        file: 'lib/index.min.js',
        format: 'esm'
    }],
    plugins: [typescript(), image()]
}];