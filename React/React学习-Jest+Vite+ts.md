- [Jest + React + Vite + ts](#jest--react--vite--ts)
- [Setup for Testing the components](#setup-for-testing-the-components)

----------------------------------------------------------

## Jest + React + Vite + ts

1. `npm install --save-dev jest`
2. `npm install @testing-library/react --save-dev`
3. `npm install ts-jest @types/jest --save-dev`
4. In the 'package.json', add `"test": jest` to the script
5. create a folder called `src/__tests__` and add the test file: `src/__tests__/App.spec.tsx`
6. `npm run test`

```ts
//src/__tests__/App.spec.tsx
test('demo', () => {
  expect(true).toBe(true)
})
```

## Setup for Testing the components

1. `npm install ts-node @testing-library/jest-dom --save-dev`
2. `npm install jest-environment-jsdom`
3. `npm install identity-obj-proxy --save-dev`
4. create a 'jest.config.js' file in root directory

```ts
export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        "^.+\\.tsx?$": "ts-jest" 
    // process `*.tsx` files with `ts-jest`
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
    },
}
```

5. create a 'test' folder, then create a '__mocks__' folder in the test folder and add a 'src/test/__mocks__/fileMock.js'

```ts
// src/test/__mocks__/fileMock.js
module.exports = {
    __esModule: true,
    default: 'test-file-stub',
};
```

6. In the App.test.tsx, `import @testing-library/jest-dom`

```ts
// src/__tests__/App.test.tsx
import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import App from "../App"
test('demo', () => {
    expect(true).toBe(true)
})
test("Renders the main page", () => {
    render(<App />)
    expect(true).toBeTruthy()
})
```

- [Installing Jest for Testing in Your Vite-React TypeScript Project](https://dev.to/hannahadora/jest-testing-with-vite-and-react-typescript-4bap)
  - https://github.com/sodatea/vite-jest
- [jest-cheat-sheet](https://github.com/sapegin/jest-cheat-sheet)
- [Testing React Apps](https://jestjs.io/docs/tutorial-react)
- [How to setup Jest and React Testing Library in Vite project-js](https://zaferayan.medium.com/how-to-setup-jest-and-react-testing-library-in-vite-project-2600f2d04bdd)

[⬆ back to top](#top)
