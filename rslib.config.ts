import { pluginReact } from '@rsbuild/plugin-react'
import { defineConfig } from '@rslib/core'

export default defineConfig({
  plugins: [
    pluginReact({
      swcReactOptions: {
        runtime: 'preserve',
      },
    }),
  ],
  lib: [
    {
      bundle: false,
      format: 'esm',
      syntax: 'esnext',
      output: {
        distPath: {
          root: './dist',
        },
        filename: {
          js: '[name].jsx',
        },
        sourceMap: true,
        emitCss: true,
      },
      dts: true,
    },
  ],
})
