import commonjs from '@rollup/plugin-commonjs'
import image from '@rollup/plugin-image'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import serve from 'rollup-plugin-serve'

const showAddress = () => ({
  load: () =>
    console.log(
      '\x1b[35m%s\x1b[0m',
      `Current registry address: http://localhost:3002/dapplet.json`
    ),
})

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'lib/index.js',
        format: 'cjs',
        exports: 'named',
      },
    ],
    plugins: [
      typescript(),
      json(),
      resolve({ browser: true }),
      commonjs(),
      image(),
      serve({ port: 3002 }),
      showAddress(),
    ],
  },
]
