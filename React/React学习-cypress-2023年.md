[React学习-cypress](#top)

-----------------------------------------------------------

## install and setup cypress

- [react-vite-ts official github](https://github.com/cypress-io/cypress-component-testing-apps/tree/main/react-vite-ts)
- [Cypress Component Testing setup](https://docs.cypress.io/guides/component-testing/getting-started)
- `npm install cypress`
- Open Cypress at first time, need configuration
  - `npx cypress open`: Open Cypress, following instruction in opening dialog
  - ![cypress](cypress.png)
  - Test file such as 'xxx.cy.tsx' will be generated automatically
- Open Cypress in graph GUI
  - adding following in package.json
  - `"cyopen": "cypress:open"`
- Running the Test in command line
  - adding following in package.json
  - `"cyrun": "cypress run --config video=false --component"`
  - [Cypress command line](https://docs.cypress.io/guides/guides/command-line)
- **note**: can launch Cypress for a specific Testing Type using either `--e2e` or `--component`

[⬆ back to top](#top)

## Cypress Core Concepts

### Querying Elements

- Cypress is Like jQuery and Chains of Commands
  - `cy.get('.my-selector')`
  - `cy.get('#main-content').find('.article').children('img[src^="/static"]').first()`
- how is cypress work

```javascript
//1. The element is found
cy.get('#element')    // cy.get() looks for '#element', repeating the query until...
  // ...it finds the element!
  // You can now work with it by using .then
  .then(($myElement) => {
    doSomething($myElement)
  })
//2. The element is not found, A set timeout is reached
   // cy.get() looks for '#element-does-not-exist', repeating the query until...
   // ...it doesn't find the element before its timeout.
   // Cypress halts and fails the test.
cy.get('#element-does-not-exist')    
  // ...this code is never run...
  .then(($myElement) => {
    doSomething($myElement)
  })
```

### Interacting With Elements

|action commands|function|
|---|---|
|`.blur()`|Make a focused DOM element blur|
|`.focus()`  |Focus on a DOM element|
|`.clear()`|Clear the value of an input or textarea|
|`.check()` |Check checkbox(es) or radio(s)|
|`.uncheck()` |Uncheck checkbox(es)|
|`.select()` |Select an <option> within a <select>|
|`.dblclick()` |Double-click a DOM element|
|`.rightclick()` |Right-click a DOM element|

```javascript
it('when button is clicked, should call onClick', () => {
    cy.mount(<Button onClick={cy.spy().as('onClick')}>Click Me</Button>);
    cy.get('button').contains('Click Me').click();
    cy.get('@onClick').should('have.been.called');
  });
```

### Assertions

- Cypress bundles Chai, Chai-jQuery, and Sinon-Chai to provide built-in assertions. You can see a comprehensive list of them in the list of assertions reference. You can also write your own assertions as Chai plugins and use them in Cypress

|Type of asserting|command|sample|
|---|---|---|
|Implicit Assertions|`should(`) or `and()`|`cy.get('tbody tr:first').should('have.class', 'active')`<br>`.and('have.attr', 'href', '/users')`|
|Mocha Assertions|`expect()`|`expect(true).to.be.true`|
|Complex Assertions|||

```typescript
cy.get('p').should(($p) => {
  let texts = $p.map((i, el) => {  // jQuery map returns jQuery object
    return Cypress.$(el).text()
  }) 
  texts = texts.get()   // .get() converts this to an array
  expect(texts).to.have.length(3)   // array should have length of 3
  expect(texts).to.deep.eq([
    'Some text from first p',
    'More text from second p',
    'And even more text from third p',
  ])
})
```

[⬆ back to top](#top)

## Cypress component testing

1. Mounting a Component:   `cy.mount()`
2. Passing Data to a Component: `cy.mount(<Stepper initial={100} />)`
3. Testing Event Handlers: Pass a Cypress `spy()` to an event prop and validate it was called
- [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/getting-started#Your-First-Component-Test)


```javascript
it('clicking + fires a change event with the incremented value', () => {
  const onChangeSpy = cy.spy().as('onChangeSpy')
  cy.mount(<Stepper onChange={onChangeSpy} />)
  cy.get('[data-cy=increment]').click()
  cy.get('@onChangeSpy').should('have.been.calledWith', 1)
})
```

### Input component testing
### Button component testing
### Form component testing

- https://github.com/cypress-io/cypress-component-testing-apps/tree/main/react-vite-ts

[⬆ back to top](#top)

## Custom Mount Commands

### React Router testing

- uses MemoryRouter to wrap the component
- pass in props that will get passed to MemoryRouter in the options

```typescript 
//Typing.tsx
declare global {
  namespace Cypress {
    interface Chainable {
      mount(
        component: React.ReactNode,
        options?: MountOptions & { routerProps?: MemoryRouterProps }
      ): Cypress.Chainable<MountReturn>
    }
  }
}
//cypress/support/component.js
Cypress.Commands.add('mount', (component, options = {}) => {
  const { routerProps = { initialEntries: ['/'] }, ...mountOptions } = options
  // uses MemoryRouter to wrap the component
  // pass in props that will get passed to MemoryRouter in the options.
  const wrapped = <MemoryRouter {...routerProps}>{component}</MemoryRouter>
  return mount(wrapped, mountOptions)
})
// xxx.component.cy.tsx
it('home link should be active when url is "/"', () => {
  // No need to pass in custom initialEntries as default url is '/'
  cy.mount(<Navigation />)
  cy.get('a').contains('Home').should('have.class', 'active')
})
it('login link should be active when url is "/login"', () => {
  cy.mount(<Navigation />, { routerProps: { initialEntries: ['/login'], },
})
cy.get('a').contains('Login').should('have.class', 'active')
})
```

### Redux testing

- create a mount command that will wrap your component in a Redux Provider

```typescript 
//Typing.tsx
declare global {
  namespace Cypress {
    interface Chainable {
      mount(
        component: React.ReactNode,
        options?: MountOptions & { reduxStore?: EnhancedStore<RootState> }
      ): Cypress.Chainable<MountReturn>
    }
  }
}
//cypress/support/component.js
Cypress.Commands.add('mount', (component, options = {}) => {
  // Use the default store if one is not provided
  const { reduxStore = getStore(), ...mountOptions } = options
  const wrapped = <Provider store={reduxStore}>{component}</Provider>
  return mount(wrapped, mountOptions)
})
// xxx.component.cy.tsx
it('User profile should display user name', () => {
  const user = { name: 'test person' }
  // getStore is a factory method that creates a new store
  const store = getStore()
  // setUser is an action exported from the user slice
  store.dispatch(setUser(user))
  cy.mount(<UserProfile />, { reduxStore: store })
  cy.get('div.name').should('have.text', user.name)
})
```
