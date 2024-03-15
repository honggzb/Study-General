## React学习-配置-vite分块打包

```js
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames(assetInfo) {
          if(assetInfo.name.endsWith('.css')) {
            return 'css/[name]-[hash].css';
          }
          const imgExts = ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.ico'];
          if(imgExts.some(ext => assetInfo.name.endsWith(ext)) {
            return 'imgs/[name]-[hash][ext]';
          }
          return 'assets/123-[hash].css';
        }
      }
    }
  }
})
```

- https://rollupjs.org/configuration-options/#output-entryfilenames

```
├── 📂dist
│     ├──  📂The Complete React Developer Course -w Hooks and Redux- Andrew Mead/
│     ├──  📂css
│     │    └── 📄index-fc45fjds.css
│     ├──  📂imgs
│     │    └── 📄react-4sdf000a.svg
│     ├──  📂js
│     │    ├── 📄about-fc45sdffjds.css
│     │    └── 📄index-fc45fjds.css
│     ├── 📄index.html
```
