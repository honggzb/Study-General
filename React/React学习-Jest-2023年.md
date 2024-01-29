[React学习-jest-2023年](#top)

- [Jest](#jest)
- [Global API](#global-api)
- [单元测试的几个指标](#单元测试的几个指标)
- [Function Test](#function-test)
- [Component Test](#component-test)
- [async test异步测试](#async-test异步测试)

------------------------------------------------------------------

## Jest 

- [Jest](https://jestjs.io/docs/getting-started)是Facebook开源的一个前端测试框架，主要用于React和React Native的单元测试，已被集成在create-react-app中。Jest特点：
  - 易用性：基于Jasmine，提供断言库，支持多种测试风格
  - 适应性：Jest是模块化、可扩展和可配置的
  - 沙箱和快照：Jest内置了JSDOM，能够模拟浏览器环境，并且并行执行
  - 快照测试：Jest能够对React组件树进行序列化，生成对应的字符串快照，通过比较字符串提供高性能的UI检测
  - Mock系统：Jest实现了一个强大的Mock系统，支持自动和手动mock
  - 支持异步代码测试：支持Promise和async/await
  - 自动生成静态分析结果：内置Istanbul，测试代码覆盖率，并生成对应的报告
- react-testing-library
- create a 'test' folder, create 'xxx.test.js' for file need test in 'test' folder

## Global API

|API|功能|
|---|---|
|`describe(name, fn)`|描述块，讲一组功能相关的测试用例组合在一起|
|`it(name, fn, timeout)`|别名test，用来放测试用例|
|`afterAll(fn, timeout)`|所有测试用例跑完以后执行的方法|
|`beforeAll(fn, timeout)`|所有测试用例执行之前执行的方法|
|`afterEach(fn)`|在每个测试用例执行完后执行的方法|
|`beforeEach(fn)`|在每个测试用例执行之前需要执行的方法|

```javascript
beforeAll(() => {
  console.log('global before all');
});
afterAll(() => {
  console.log('global after all');
});
describe('test1', () => {
  it('test sum', () => {
    expect(sum(2, 3)).toEqual(5);
  });
});
```

[⬆ back to top](#top)

## 单元测试的几个指标

- **%stmts** 是语句覆盖率（statement coverage）：是不是每个语句都执行了？
- **%Branch** 分支覆盖率（branch coverage）：是不是每个if代码块都执行了？
- **%Funcs** 函数覆盖率（function coverage）：是不是每个函数都调用了？
- **%Lines** 行覆盖率（line coverage）：是不是每一行都执行了？

## Function Test

```javascript
describe('test1', () => {
  it("divide correctly 2 values", () => {
    expect(() => divide()).toThrowError("You can't divide by 0");
    expect(divide(2, 3)).toBe(0.67);
  });
});
```

[⬆ back to top](#top)

## Component Test

**Some tips**

- `npm run calculator`: only test one file
- `screen.debug();`
- add `data-testid="xxx` in html if use `getByTestId`

```javascript
function getCalculator() {
  return {
   // getByRole, getByText, getByTestId: get meaning static
    getValueA: () => screen.getByTestId("inputA").value,     
    getValueB: () => screen.getByTestId("inputB").value,
    getOperator: () => screen.getByTestId("operator").value,
};
describe("<Calculator/>", () => {
   // test elements
  it("has 'Calculator' displayed somewhere", () => {
    render(<Calculator />);
    screen.debug();        // debug
    const textElement = screen.getByText("Calculator");
    expect(textElement.textContent).toBe("Calculator");
  });
  // test event
  it("Display a message when no operator is provided", () => {
    render(<Calculator defaultA={1} defaultB={"0"} defaultOperator={"/"} />);
    fireEvent.change(screen.getByTestId("operator"), {
      target: { value: "!" },
    });
    expect(getResult()).toBe("No operator provided");
  });
  it("returns 0 when the inputs are empty", () => {
    render(<Calculator defaultA={1} defaultB={"0"} defaultOperator={"x"} />);
    fireEvent.change(screen.getByTestId("inputA"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByTestId("inputB"), {
      target: { value: "" },
    });
    expect(getResult()).toBe("0");
  });
}
```

[⬆ back to top](#top)

## async test异步测试

- https://jestjs.io/docs/tutorial-async

```javascript
// test HTTP request
import { fireEvent, render, screen } from "@testing-library/react";
import axios from "axios";
jest.mock("axios");          //mock axios request

describe("<RandomUser/>", () => {
  it("loads user when clicking on the button", async () => {       //use async
    render(<RandomUser />);
    axios.get.mockResolvedValueOnce({ data: MOKE_USER_RESPONSE });  //mock axios get
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const titleEl = await screen.findByText("Larry Morales");
    expect(titleEl.textContent).toBe("Larry Morales");
  });
});
const MOKE_USER_RESPONSE = {...}
```

[⬆ back to top](#top)

> [Jest + React 单元测试最佳实践](https://www.cnblogs.com/dtux/p/17119560.html)
> [react-tests -github](https://github.com/codiku/react-tests)
