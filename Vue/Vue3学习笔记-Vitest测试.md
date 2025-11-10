[Vitest测试Vue](#top)

- [测试环境搭建](#测试环境搭建)
- [基本测试结构](#基本测试结构)
- [常见测试场景详解](#常见测试场景详解)
  - [组件渲染测试](#组件渲染测试)
  - [响应式数据测试](#响应式数据测试)
  - [用户交互测试](#用户交互测试)
  - [Props 和事件测试](#props-和事件测试)
  - [组合式 API 组件测试](#组合式-api-组件测试)
- [高级测试技巧](#高级测试技巧)
  - [模拟依赖](#模拟依赖)
  - [路由和Vuex/Pinia集成测试](#路由和vuexpinia集成测试)
  - [异步组件测试](#异步组件测试)
- [测试优化策略](#测试优化策略)
  - [组件隔离与模拟](#组件隔离与模拟)
  - [自定义匹配器](#自定义匹配器)
  - [测试夹具（Fixtures）](#测试夹具fixtures)
  - [快照测试](#快照测试)
  - [使用 Factory 模式创建测试组件](#使用-factory-模式创建测试组件)
- [测试覆盖率与CI/CD集成](#测试覆盖率与cicd集成)

-------------------------------------------

- 选择合适的工具：Vitest + Vue Test Utils 是 Vue 3 项目的理想组合
- 结构化测试：遵循 AAA (Arrange-Act-Assert) 模式组织测试
- 全面测试：覆盖渲染、交互、状态管理等各方面
- 模拟外部依赖：确保测试的隔离性和可靠性
- 持续集成：将测试融入 CI/CD 流程，保障代码质量

 ## 测试环境搭建

   1. `npm install -D vitest @vue/test-utils happy-dom`
   2. 在 'vite.config.js' 中添加 Vitest 配置
   3. 在 'package.json' 中添加测试脚本

```js
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',   // 使用 happy-dom 模拟 DOM 环境
    globals: true,    // 支持 .vue 文件的测试
    // 在测试中支持 Vue 组件的导入
    deps: {
      inline: ['@vue']
    }
  }
})
// package.json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest",
  "test:ui": "vitest --ui",
  "test:coverage": "vitest run --coverage"
}
```

## 基本测试结构

```js
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from './MyComponent.vue'
describe('MyComponent', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(MyComponent)
  })
  it('renders correctly', () => {
    expect(wrapper.find('h1').text()).toBe('My Component')
  })
})
```

[⬆ back to top](#top)

## 常见测试场景详解

### 组件渲染测试

```js
// 验证组件是否正确渲染其内容
it('renders the correct title', () => {
  const title = 'Welcome to My App'
  const wrapper = mount(Header, {
    props: { title }
  })
  expect(wrapper.find('h1').text()).toBe(title)
})
```

### 响应式数据测试

```js
import { nextTick } from 'vue'
it('updates counter display when count changes', async () => {
  const wrapper = mount(Counter)
  // 通过 setData 直接修改组件数据
  await wrapper.setData({ count: 5 })
  // 确保 DOM 已更新
  await nextTick()
  expect(wrapper.find('.count-display').text()).toBe('5')
})
```

### 用户交互测试

```js
it('submits form with user input', async () => {
  const wrapper = mount(LoginForm);
  await wrapper.find('input[type="email"]').setValue('test@example.com')
  await wrapper.find('input[type="password"]').setValue('password123')
  const submitSpy = vi.fn()
  wrapper.vm.$emit = submitSpy
  await wrapper.find('form').trigger('submit.prevent')
  expect(submitSpy).toHaveBeenCalledWith('submit', {
    email: 'test@example.com',
    password: 'password123'
  })
})
```

[⬆ back to top](#top)

### Props 和事件测试

```js
it('emits update event when value changes', async () => {
  const wrapper = mount(CustomInput, {
    props: {
      modelValue: ''
    }
  })
  await wrapper.find('input').setValue('New Value')
  expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  expect(wrapper.emitted('update:modelValue')[0]).toEqual(['New Value'])
})
```

### 组合式 API 组件测试

```js
import { ref, computed } from 'vue'
// 模拟一个使用组合式API的组件
const UseCounter = {
  setup() {
    const count = ref(0)
    const double = computed(() => count.value * 2)

    function increment() {
      count.value++
    }
    return { count, double, increment }
  },
  template: `
    <div>
      <p class="count">Count: {{ count }}</p>
      <p class="double">Double: {{ double }}</p>
      <button @click="increment">Increment</button>
    </div>
  `
}
it('correctly updates computed properties', async () => {
  const wrapper = mount(UseCounter)
  expect(wrapper.find('.count').text()).toBe('Count: 0')
  expect(wrapper.find('.double').text()).toBe('Double: 0')
  await wrapper.find('button').trigger('click')
  expect(wrapper.find('.count').text()).toBe('Count: 1')
  expect(wrapper.find('.double').text()).toBe('Double: 2')
})
```

[⬆ back to top](#top)

## 高级测试技巧

### 模拟依赖

- 使用 Vitest 的 `vi.mock()` 模拟外部依赖

```js
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UserProfile from './UserProfile.vue'
import { fetchUserData } from './api'
// 模拟 API 调用
vi.mock('./api', () => ({
  fetchUserData: vi.fn().mockResolvedValue({
    name: 'Test User',
    email: 'test@example.com'
  })
}))
it('loads and displays user data', async () => {
  const wrapper = mount(UserProfile, {
    props: { userId: '123' }
  })
  // 组件通常在 mounted 钩子中调用 API
  await flushPromises()
  expect(fetchUserData).toHaveBeenCalledWith('123')
  expect(wrapper.find('.user-name').text()).toBe('Test User')
})
```

[⬆ back to top](#top)

### 路由和Vuex/Pinia集成测试

```js
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
// 创建测试用路由
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About }
  ]
})
// 设置 Pinia
const pinia = createPinia()
it('navigates when nav link is clicked', async () => {
  // 应用 router 和 pinia
  setActivePinia(pinia)
  const wrapper = mount(App, {
    global: {
      plugins: [router, pinia]
    }
  })
  // 触发导航
  await wrapper.find('a[href="/about"]').trigger('click')
  // 等待路由变化
  await router.isReady()
  // 验证页面内容变化
  expect(wrapper.find('h1').text()).toBe('About Page')
})
```

[⬆ back to top](#top)

### 异步组件测试

```js
import { flushPromises } from '@vue/test-utils'
it('shows loading state and then content', async () => {
  // 模拟一个慢速 API
  vi.mock('./api', () => ({
    fetchData: vi.fn().mockImplementation(() => {
      return new Promise(resolve => {
        setTimeout(() => resolve({ message: 'Data loaded' }), 100)
      })
    })
  }))
  const wrapper = mount(AsyncComponent)
  // 初始应该显示加载状态
  expect(wrapper.find('.loading').exists()).toBe(true)
  // 等待异步操作完成
  await flushPromises()
  // 加载完成后应显示内容，隐藏加载状态
  expect(wrapper.find('.loading').exists()).toBe(false)
  expect(wrapper.find('.content').text()).toBe('Data loaded')
})
```

[⬆ back to top](#top)

## 测试优化策略

### 组件隔离与模拟

```js
// 全局模拟 ChildComponent, 为了更好地隔离被测组件，模拟子组件
const mockChildComponent = {
  name: 'ChildComponent',
  template: '<div class="mocked-child"></div>'
}
const wrapper = mount(ParentComponent, {
  global: {
    stubs: {
      ChildComponent: mockChildComponent
    }
  }
})
```

### 自定义匹配器

```js
// 扩展 expect 以支持 Vue 组件测试的常见断言
expect.extend({
  toHaveEmitted(wrapper, event, payload) {
    const emitted = wrapper.emitted(event)
    if (!emitted) {
      return {
        message: () => `expected component to emit "${event}" but it didn't`,
        pass: false
      }
    }
    if (payload !== undefined) {
      const match = emitted.some(args => {
        return JSON.stringify(args[0]) === JSON.stringify(payload)
      })
      return {
        message: () => match
          ? `expected component not to emit "${event}" with ${JSON.stringify(payload)}`
          : `expected component to emit "${event}" with ${JSON.stringify(payload)}`,
        pass: match
      }
    }
    return {
      message: () => `expected component not to emit "${event}"`,
      pass: true
    }
  }
})
// 使用
it('emits the correct event', async () => {
  await wrapper.find('button').trigger('click')
  expect(wrapper).toHaveEmitted('update', { value: 1 })
})
```

[⬆ back to top](#top)

### 测试夹具（Fixtures）

- 可复用的测试数据和工具函数

```js
// fixtures/users.js
export const users = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'user' }
]
// fixtures/mountOptions.js
export function createMountOptions(overrides = {}) {
  return {
    global: {
      mocks: {
        $t: (key) => key,  // 模拟 i18n
        $router: { push: vi.fn() } // 模拟 router
      },
      ...overrides.global
    },
    ...overrides
  }
}
```

### 快照测试

- 快照测试验证组件渲染一致性

```js
it('matches snapshot', () => {
  const wrapper = mount(ComplexComponent, {
    props: {
      title: 'My Title',
      items: ['Apple', 'Banana', 'Cherry']
    }
  })
  expect(wrapper.html()).toMatchSnapshot()
})
```

### 使用 Factory 模式创建测试组件

```js
function createLoginForm(options = {}) {
  return mount(LoginForm, {
    props: {
      redirectUrl: '/dashboard',
      ...options.props
    },
    global: {
      plugins: [options.pinia || createTestPinia()],
      ...options.global
    }
  })
}
it('validates email format', async () => {
  const wrapper = createLoginForm()
  // 测试逻辑...
})
it('shows loading state during submission', async () => {
  const wrapper = createLoginForm({
    props: {
      isLoading: true
    }
  })
  // 测试逻辑...
})
```

[⬆ back to top](#top)

## 测试覆盖率与CI/CD集成

1. 在 'vite.config.js' 中添加覆盖率配置
2. 在 GitHub Actions 中集成 Vitest

```js
// vite.config.js
test: {
  coverage: {
    provider: 'c8', // 或者使用 'istanbul'
    reporter: ['text', 'json', 'html'],
    exclude: [
      'node_modules/',
      'dist/',
      '**/*.{test,spec}.{js,ts}'
    ]
  }
}
// github/workflows/test.yml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: 'npm'
      - run: npm ci
      - run: npm run test:coverage

      # 可选：上传覆盖率报告
      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
```

[⬆ back to top](#top)

> [Vue 3 组件测试实战：Vitest 高效测试指南](https://juejin.cn/post/7485571704959041574)
