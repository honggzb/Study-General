[Vue3学习小结27--unit test by Vitest](#top)

- [Testing different types of components](#testing-different-types-of-components)
  - [Testing a component with data](#testing-a-component-with-data)
  - [Testing a component with computed properties](#testing-a-component-with-computed-properties)
  - [Testing a component with methods](#testing-a-component-with-methods)
  - [Testing what the component will render](#testing-what-the-component-will-render)
- [snapshot test caases](#snapshot-test-caases)
  - [Testing click events](#testing-click-events)
- [Mocking HTTP requests](#mocking-http-requests)
  - [MSW- Mock Service Worker (MSW)](#msw--mock-service-worker-msw)
  - [Mock Axios](#mock-axios)
- [Some sample](#some-sample)

-------------------------------------

- Vitest aims to position itself as the Test Runner of Choice for Vite projects and as a solid alternative even for projects not using Vite

## Testing different types of components

```vue
<template>
  <div>
    <ol>
      <li v-for="fruit in fruits" :key="fruit">{{ fruit }}</li>
    </ol>
    <p> Number of fruits: {{ numFruits }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return { fruits: ["apple", "banana", "orange"]};
  },
  computed: {
    numFruits() { return this.fruits.length; },
  },
};
</script>
```

### Testing a component with data

```ts
import { mount } from '@vue/test-utils'
import FruitList from '../src/components/FruitList.vue'
describe('FruitList component test', () => {
    test("tests data attributes", () => {
        const wrapper = mount(FruitList)
        expect(wrapper.vm.fruits).toEqual(["apple", "banana", "orange"]);
    })
})
```

### Testing a component with computed properties

```ts
test('return total number of fruits', () => {
    const wrapper = mount(FruitList)
    expect(wrapper.vm.numFruits).toBe(2); // it fails because fruits array has 3 elements not 2
    expect(wrapper.vm.numFruits).toBe(3); // it passes
})
```

### Testing a component with methods

```ts
test('tests addFruit method', () => {
    const wrapper = mount(FruitList)
    const vm = wrapper.vm
    expect(vm.fruits.length).toBe(3)
    // add mango to the fruit list
    vm.addFruit('mango')
    expect(vm.fruits.length).toBe(4)
 })
```

### Testing what the component will render

```ts
test('displays a list of fruits', () => {
   const wrapper = mount(FruitList)
   const fruits = wrapper.findAll('li')
   expect(fruits.at(0).text()).toBe('apple')
   expect(fruits.at(1).text()).toBe('banana')
   expect(fruits.at(2).text()).toBe('orange')
})
test('displays the number of fruits', () => {
   const wrapper = shallowMount(FruitList)
   const numFruits = wrapper.find('p')
   expect(numFruits.text()).toBe('Number of fruits: 3')
})
```

[⬆ back to top](#top)

## snapshot test caases

- A snapshot is used to keep track of changes in the user interface.
- A typical snapshot test case renders a UI component, takes a snapshot, and compares it to a reference snapshot file alongside the test

```ts
test('snapshot UI testing', () => {
   const wrapper = mount(GuessAge,{});
   expect(wrapper.text()).toMatchSnapshot()
})
```

[⬆ back to top](#top)

### Testing click events

```ts
test("has a button", () => {
  expect(wrapper.find("button").exists()).toBe(true);
});
test("Button clicked", async () => {
   const ac = await wrapper.get("button").trigger("click")
   expect(wrapper.vm.search).toEqual("")
})
```

[⬆ back to top](#top)

## Mocking HTTP requests

### MSW- Mock Service Worker (MSW)

```ts
import { setupServer } from 'msw/node'
import { rest } from 'msw'
export const restHandlers = [
   rest.get('https://api.agify.io/', (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([
         { age: 55, name: "tope" }
      ]))
   }),
]
const server = setupServer(...restHandlers)
// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
//  Close server after all tests
afterAll(() => server.close())
// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers())
```

### Mock Axios

```ts
export const sayHello = async () => {
    const response = await axios.get('http://some-url')
    const { name } = response
    return `Hello, ${name}`
}
// test
import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest'
import axios from 'axios'
import { sayHello } from './hello'
describe('SayHelloTest', () => {
    afterEach(async () => {
        vi.restoreAllMocks()  // Restore all mocks after each test
    })
    test('Should handle Axios rejected promise', async () => {
        // Mock Axios request using vitest
        vi.spyOn(axios, 'get').mockRejectedValue(new Error('Failed to fetch'))
        await expect(sayHello()).rejects.toThrow('Failed to fetch')
    })
    test('Should handle Axios resolved promise', async () => {
        // Mock Axios request using vitest
        vi.spyOn(axios, 'get').mockResolvedValue({ name: 'John' })
        await expect(sayHello()).resolves.toBe('Hello, John')
    })
})
```

- [vitest-mock-axios](https://github.com/jacksongross/vitest-mock-axios)
- [Mocking- official](https://vitest.dev/guide/mocking.html)

[⬆ back to top](#top)

## Some sample

```ts
///greeting.vue
<template>
  <div>{{ greeting }}</div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Greeting',
  data() {
    return { greeting: 'Vue and TDD' }
  },
})
</script>
// Greeting.spec.ts
import { mount } from '@vue/test-utils'
import Greeting from '../../src/components/Greeting.vue'
describe('Greeting.vue', () => {
  it('renders a greeting', () => {
    const wrapper = mount(Greeting)
    expect(wrapper.text()).toMatch('Vue and TDD')
  })
})
```

```ts
<template>
  <div>
    <h1>About</h1>
    <h2>Count: {{ count }}</h2>
    <button @click="increment">Increment</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'About',
  components: {},
  data() {
    return { count: 0 }
  },
  methods: {
    increment() { this.count += 1 },
  },
})
</script>
// -----
import { mount } from '@vue/test-utils'
import About from './About.vue'
test('uses mounts', async () => {
  const wrapper = mount(About)
  expect(wrapper.html()).toContain('About')
  expect(wrapper.html()).toContain('Count: 0')
  await wrapper.find('button').trigger('click')
  expect(wrapper.html()).toContain('Count: 1')
})
```

[⬆ back to top](#top)

> References
- [vitest- offical](https://vitest.dev/)
- [Vue 3 component testing with Jest](https://blog.canopas.com/vue-3-component-testing-with-jest-8b80a8a8946b)
- [v3+vitest-比较全test](https://github.com/ta-vivo/ta-vivo/tree/master/tests)
- Jest
  - https://github.com/santicros/vue3-vite-typescript-jest/tree/main
