# Ex12: New Overlay Interface

The main advantage of the new interface is the deployment of the dapplet and overlay together.

This example based on [Ex04: Overlays.](https://github.com/dapplets/dapplet-template/tree/ex04-overlays-solution)

In the code of the **dapplet** change overlay argument `url` to `name`:

```typescript
// /src/index.ts

// old
const overlayUrl = await Core.storage.get('overlayUrl');
const overlay = Core.overlay({ url: overlayUrl, title: 'Exercise 04' });

// new
const overlay = Core.overlay({ name: 'exercise-12-overlay', title: 'Exercise 12' });
```

Now we don't get the **url** from the *Core.storage*, so we can remove **overlayUrl** from `/config/default.json` and `/config/schema.json`.

Add to the `dapplet.json` manifest the following option:

```json
"overlays": {
  "exercise-12-overlay": "http://localhost:3002"
}
```

The **overlay** should have the following configuration:

* `package.json`:

```json
{
  "name": "exercise-12-overlay",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  },
  "scripts": {
    "start": "webpack serve",
    "build": "webpack"
  },
  "devDependencies": {
    "@types/node": "^15.0.2",
    "@types/react": "^17.0.5",
    "@types/react-dom": "^17.0.3",
    "cross-env": "^7.0.3",
    "css-loader": "^5.2.4",
    "eslint": "^7.26.0",
    "file-loader": "^6.2.0",
    "fork-ts-checker-webpack-plugin": "^6.2.6",
    "html-webpack-plugin": "^5.3.1",
    "style-loader": "^2.0.0",
    "ts-loader": "^9.1.2",
    "typescript": "^4.2.4",
    "webpack": "^5.36.2",
    "webpack-assets-manifest": "^5.0.6",
    "webpack-cli": "^4.7.0",
    "webpack-dev-server": "^3.11.2"
  }
}
```

* `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "types": ["node"],
    "jsx": "react"
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

* `webpack.config.js`:

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: [/\.eot$/, /\.ttf$/, /\.woff$/, /\.woff2$/, /\.svg$/, /\.png$/],
        use: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'public/index.html' }),
    new ForkTsCheckerWebpackPlugin(),
    new WebpackAssetsManifest(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    port: 3002,
    hot: false,
    inline: false,
    liveReload: false,
    open: false,
  },
};
```

**Run** the dapplet:

```bash
npm i
npm run start-react
```

Now you can simply **deploy** the dapplet without deploying the overlay separately.

This page in the docs is [here.](https://docs.dapplets.org/docs/new-overlay-interface)