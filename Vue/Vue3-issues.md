[学习开放过程中遇到的问题](#top)

- [vue3 Vite中不能使用require问题](#vue3-vite中不能使用require问题)

------------------------------------------------------------

## vue3 Vite中不能使用require问题

1. `npm i vite-plugin-require-transform --save-dev`
2. 在vite.config.js中配置
3. https://xuexiluxian.cn/blog/detail/e0198342424342838b89ba845e77f365

```ts
import requireTransform from 'vite-plugin-require-transform';
plugins: [
    requireTransform.default({
      fileRegex: /.js$|.vue$/
    }),
 ],
```

[⬆ back to top](#top)
