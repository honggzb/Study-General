[Common useful](#top)

- [create a react project](#create-a-react-project)
- [React router](#react-router)
- [Redux using Redux Toolkit-ts](#redux-using-redux-toolkit-ts)
  - [Create a Redux Store](#create-a-redux-store)
  - [Provide the Redux Store to React](#provide-the-redux-store-to-react)
  - [Create a Redux State Slice](#create-a-redux-state-slice)
  - [using redux in component](#using-redux-in-component)
- [Redux Persist + Redux Toolkit](#redux-persist--redux-toolkit)
  - [adding persistReducer and persistStore to store](#adding-persistreducer-and-persiststore-to-store)
  - [wrap root component with PersistGate](#wrap-root-component-with-persistgate)
- [using bootstrap](#using-bootstrap)
- [install and setup tailwindcss](#install-and-setup-tailwindcss)
- [updating whole packages to latest version](#updating-whole-packages-to-latest-version)
- [using context](#using-context)
- [using SCSS](#using-scss)
- [install and setup msw](#install-and-setup-msw)

--------------------------------------------------------------------------------

## create a react project

|project type|CLI|
|---|---|
| typescript project| `npx create-react-app myproject --template typescript`|
|Next.js全栈式的 React 框架<br>Next.js的App Router是对 Next.js API的重新设计，<br>旨在实现 React 团队的全栈架构愿景。它让你在异步组件中获取数据，这些组件甚至能在服务端构建过程中运行<br>Next.js 只支持React 16+| `npx create-next-app@latest`<br>`npx create-next-app --example with-redux my-app`<br>https://redux-toolkit.js.org/usage/nextjs|
|Vite|`npm create vite@latest`|
|Remix 具有嵌套路由的全栈式 React 框架|`npx create-remix`|
|Gatsby 快速的支持 CMS 的网站的 React 框架|`npx create-gatsby`|
|Expo 具有真正原生 UI 的应用，包括 Android、iOS，以及 Web 应用| `npx create-expo-app`|

VSCode shotword

|shotword|CLI|
|---|---|
|rafce   | component|

[⬆ back to top](#top)

## React router

```javascript
//1. npm i react-router-dom
//2.
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
//3. 
<BrowserRouter>
   <nav>
      <ul>
         <li> <Link to="/">Home</Link> </li>
         <li> <Link to="/basic">Basic</Link> </li>
      </ul>
   </nav>
   <Routes>
      <Route path="/basic" element={<Basic />}></Route>
      <Route path="/" element={<Home />}></Route>
   </Routes>
</BrowserRouter>
```

[⬆ back to top](#top)

## Redux using Redux Toolkit-ts

- principles of redux state
  - Single source of truth
  - state is read only
  - Changes using pure function
- ![reduxFlow](./images/reduxFlow.png)
- design state of project
  - ![reduxProject](./images/reduxProject.png)
- [Redux Toolkit](https://redux-toolkit.js.org/tutorials/quick-start)
- chrome extension
  - React Developer Tools
  - redux Devtools
- Create project with redux:  `npx create-next-app --example with-redux my-app`
- `npm i @reduxjs/toolkit react-redux`
- `npm i --save-dev @types/node` - for using require in store

### Create a Redux Store

```javascript
//store.tsx
import { configureStore } from '@reduxjs/toolkit'
export const store = configureStore({
  reducer: { 
    counter: counterReducer,
    noteSlice: noteReducer
  },
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
```

[⬆ back to top](#top)

### Provide the Redux Store to React

```javascript
import { store } from './app/store'
import { Provider } from 'react-redux'
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

[⬆ back to top](#top)

### Create a Redux State Slice

```javascript
//note-slice.tsx
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
export interface NotesState {
  noteList: string[]
}
const initialState: NotesState = {
  value: 0,
}
export const noteSlice = createSlice({
    name: "noteSlice",
    initialState,
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    reducers: {
        setNoteList: (currentSlice, action: PayloadAction<string>) => {
            currentSlice.noteList = action.payload;
        },
        addNote: (currentSlice, action) => {
            currentSlice.noteList.push(action.payload);
        },
        //...
    },
});
export const { setNoteList, addNote } = noteSlice.actions;
export const noteReducer = noteSlice.reducer;
// Action creators are generated for each case reducer function
```

[⬆ back to top](#top)

### using redux in component

- `useSelector`: read data from the store
- `useDispatch`: dispatch actions

```javascript
// note.tsx
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from '../../app/store'
import { updateNote, deleteNote } from "../../store/note-slice";
export function Note() {
   const note = useSelector(state: RootState => 
      store.noteSlice.noteList.find(note => note.id === id)
   );
    const dispatch = useDispatch();
    const submit = async (formValues) => {
        const updatedNote = await NoteAPI.updateById(note.id, formValues);
        dispatch(updateNote(updatedNote));
        setIsEditable(false);
         //...
     }
   return (
        <>{ note && (
            <NoteForm 
                isEditable={isEditable}
                title={note.title}
                note={note}
                onClickDelete={deleteNote_} 
                onClickEdit={() => setIsEditable(!isEditable)}
                onSubmit={isEditable && submit}/>
            )}
        </>
    )
}
```

[⬆ back to top](#top)

## Redux Persist + Redux Toolkit

- `npm install redux-persist`

### adding persistReducer and persistStore to store

```javascript
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
//import storageSession from 'redux-persist/lib/storage/session';  //sessionStorage
import { persistReducer, persistStore } from 'redux-persist';
// Nested persists using Redux Persist
const rootReducer = combineReducers({
    userSlice: userReducer, 
    cartSlice: cartReducer 
});
const persistConfig = {
    key: 'root',
    storage,      //using localStorage
    whitelist: ["cartSlice"],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer, 
    // middleware to prevent some serialize error
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

[⬆ back to top](#top)

### wrap root component with PersistGate

```javascript
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/store';

<React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
</React.StrictMode>,
```

- [Redux Persist official](https://github.com/rt2zz/redux-persist)
- [Persist state with Redux Persist using Redux Toolkit in React](https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/)
  
[⬆ back to top](#top)

## using bootstrap

```html
<link href="https://fonts.cdnfonts.com/css/maximum-impact" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">    
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"/>
```

[⬆ back to top](#top)

## updating whole packages to latest version

- remove yarn.lock: `rm -rf yarn.lock`
- update all dependencies: `npm update -D`
- `npm audit fix`
- `npm i`

[⬆ back to top](#top)

## install and setup tailwindcss

- [tailwindcss install-using postcss](https://tailwindcss.com/docs/installation/using-postcss)
- `npm i tailwindcss postcss autoprefixer --save-dev`
- `npx tailwindcss init -p`
   - [Vite PostCSS module error when building app in Svelte](https://stackoverflow.com/questions/73136479/vite-postcss-module-error-when-building-app-in-svelte)
- adding following to 'postcss.config.js' and 'tailwind.config.js'
- adding three lines in 'index.css' file

```javascript
//postcss.config.js
 plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
//tailwind.config.js
content: ["./src/**/*.{html,tsx}"],
//index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

[⬆ back to top](#top)

## using context

```typescript
//themeContext.js
export const ThemeModeContext = createContext('light');
export const THEME ={
   light: {},
   dark: {}
}
//App.jsx
const initialThemeMode = useContext(ThemeModeContext);
const [themeMode,setThememode] = useState(initialThemeMode);
<ThemeModeContext.provider value={{themeMode, setThememode}}>
   <div style={{ color: THEME[themeMode].textcolor}}></div>
</ThemeModeContext.provider>
// level5.jsx
const [themeMode,setThememode] = useContext(ThemeModeContext);
function toggleThemeMode() {
   setThememode(themeMode  === 'light' ? 'dark' : 'light');
}
<ThemeModeContext.Consumer>
   <button onClick={toggleThemeMode}></button>
</ThemeModeContext.Consumer>
```

[⬆ back to top](#top)

## using SCSS 

- `npm install --save-dev postcss postcss-scss`
- modify `postcss.config.js`

```javsscript
// postcss.config.js
module.exports = {
  syntax: 'postcss-scss',
  plugins: {
    …
  }
}
```

[⬆ back to top](#top)

## install and setup msw

- [msw](https://mswjs.io/docs): Mock Service Worker (MSW) is an API mocking library for browser and Node.js. With MSW, you can intercept outgoing requests, observe them, and respond to them using mocked responses.
- `npm install msw --save-dev`
