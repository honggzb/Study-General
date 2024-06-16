[Vue3学习小结17--编写Vue3自定义插件](#top)

-------------------------------------

- 插件是自包含的代码，通常向 Vue 添加全局级功能
- 如果是一个对象需要有`install`方法`Vue`会帮你自动注入到`install` 方法 你如果是`function` 就直接当`install`方法去使用

```
├── 📂Loading/
│   ├── 📄Loading.ts
│   └── 📄Loading.vue
├── 📄App.vue
├── 📄main.ts
```

[⬆ back to top](#top)

> References
- [小满zs-csdn博客](https://blog.csdn.net/qq1195566313/category_11618172.html)
- [学习Vue3 第三十章（编写Vue3插件）](https://xiaoman.blog.csdn.net/article/details/123300264)
