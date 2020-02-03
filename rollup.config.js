import typescript from '@rollup/plugin-typescript';
import image from '@rollup/plugin-image';
import serve from 'rollup-plugin-serve';

export default [{
    input: 'src/index.ts',
    output: [{
        file: 'lib/index.js',
        format: 'cjs',
        exports: 'named'
    }],
    plugins: [typescript(), image(), serve()]
}];