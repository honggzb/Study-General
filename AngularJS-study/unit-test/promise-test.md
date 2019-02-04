**using `beforeAll()` to let promise run thought whole digest cylce(then, catch, finally)**

```javascript
describe("Deep Thought", function() {

  module.sharedInjector();

  beforeAll(module("UltimateQuestion"));

  beforeAll(inject(function(DeepThought) {   //beforeAll() to ensure test can access to the instance of the DeepThought service
    expect(DeepThought.answer).toBeUndefined();
    DeepThought.generateAnswer();
  }));

  it("has calculated the answer correctly", inject(function(DeepThought) {
    // Therefore we can test the generated answer
    expect(DeepThought.answer).toBe(42);
  }));

  it("has calculated the answer within the expected time", inject(function(DeepThought) {
    expect(DeepThought.runTimeMillennia).toBeLessThan(8000);
  }));

  it("has double checked the answer", inject(function(DeepThought) {
    expect(DeepThought.absolutelySureItIsTheRightAnswer).toBe(true);
  }));

});
```

https://docs.angularjs.org/guide/unit-testing#testing-directives
