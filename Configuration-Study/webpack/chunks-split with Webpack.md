## [split your chunks with Webpack](#top)

- [1. bundle splitting](#bundle)
- [2. code splitting](#code)

----------------------

**types of file splitting**

- **bundle splitting**: creating more, smaller files (but loading them all on each network request anyway) for better caching
- **code splitting**: dynamically loading code, so that users only download the code they need for the part of the site that they’re viewing
- 
----------------------

<h2 id="bundle">1. bundle splitting</h2>

```javascript
const path = require('path');
const webpack = require('webpack');
module.exports = {
  //entry: path.resolve(__dirname, 'src/index.js'),
  //create a file for each of entry items
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
    ProductList: path.resolve(__dirname, 'src/ProductList/ProductList.js'),
    ProductPage: path.resolve(__dirname, 'src/ProductPage/ProductPage.js'),
    Icon: path.resolve(__dirname, 'src/Icon/Icon.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),    // so that file hashes don't change unexpectedly
  ],
  optimization: {
    //   splitChunks: {
    //       chunks: 'all'    //put everything in node_modules into a file called vendors~main.js
    //   },
    runtimeChunk: 'single',
    //Splitting out each npm package
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {       //1) rules for how Webpack should group chunks into output files
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {   //2) define a name as function, normal name are defined as string
            // get the name. E.g. node_modules/packageName/not/this/part.js or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            //get one file for each package, e.g. npm.react-dom.899sadfhj4.js
            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
};
```

[back to top](#top)

<h2 id="code">2. code splitting</h2>

**Route-based dynamic loading (React specific)**

```jsx
import React from 'react';
class AdminPageLoader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      AdminPage: null,
    }
  }
  // when component mounts, dynamically load ./AdminPage
  componentDidMount() {
    import('./AdminPage').then(module => {
      this.setState({ AdminPage: module.default });
    });
  }
  render() {
    const { AdminPage } = this.state;

    return AdminPage
      ? <AdminPage {...this.props} />
      : <div>Loading...</div>;
  }
}
export default AdminPageLoader;
```

[back to top](#top)

> [The 100% correct way to split your chunks with Webpack](https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758)
> [Webpack 4- caching](https://webpack.js.org/guides/caching/)
> [React Code-Splittin](https://reactjs.org/docs/code-splitting.html)
