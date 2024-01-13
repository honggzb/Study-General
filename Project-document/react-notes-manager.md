# React + Redux + TypeScript + Vite

## setup

1. `npm create vite@latest`
2. `npm install`

### using bootstrap

```html
<link href="https://fonts.cdnfonts.com/css/maximum-impact" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">    
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"/>
```

- tips
  - `d-none d-lg-flex`: when div is small this div will not show

## using router

1. `npm i react-router-dom react-bootstrap-icons`

## using redux

1. `npm i @reduxjs/toolkit react-redux`
2. `npm i --save-dev @types/node` - for using require in store
3.  chrome extension
   1. React Developer Tools
   2. redux Devtools
4. create store folder under src
5. create a new file 'store.tsx' under store folder
6. modify 'main.tsx'

```typescript
//store.tsx
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
    reducer: { }
});
export { store }
//main.tsx
import { Provider } from'react-redux'
import { store } from './store/index';
<React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
// 
```

[⬆ back to top](#top)

## using Contexts

```typescript
//define a context, createContext('light') , ThemeModeContext.js
import { createContext } from 'react';
export const ThemeModeContext = createContext('light');
export const THEME = {
  light: {
    textColor: '#1E1F2C',
    backgroundColor: 'white'
  },
  dark: {
    textColor: 'white',
    backgroundColor: '#1E1F2C'
  },
};
//set provider for context, <ThemeModeContext.Provider value={{themeMode, setThemeMode}}>
export function App() {
  cosnt initialThemeMode = useContext(ThemeModeContext);
  const [themeMode, setThemeMode] = useState(initialThemeMode);
  return (
  <ThemeModeContext.Provider value={{themeMode, setThemeMode}}>
      <div style={{color: THEME[themeMode].textColor, backgroundColor: HEME[themeMode].backgroundColor}}>
        >Level1 />
      </div>
    </ThemeModeContext.Provider>
  )
}
// useContext in other component
export function Level4(props) {
  const [themeMode, setThemeMode] = useContext(ThemeModeContext);
  function toggleThemeMode() {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light' )
  }
  return (
      <>
        div>I am level 4</div>
        <button (pnClick)={toggleThemeMode}>toggle ThemeMode</button>
    </>
  );
}
```

[⬆ back to top](#top)

## using useRef

```typescript
export function App() {
  const cardCodeInputRef = useRef();
  const cardExpirationInputRef = useRef();
  function handleCardCodeChange() {
      if(e.target.value.length >= 3) {
        cardExpirationInputRef.current.focus();
      }
  }
  function handleCardNumberChange(e) {
      if(e.target.value.length >= 15) {
        cardCodeInputRef.current.focus();
      }
  }
  return (
      <input onChange={handleCardNumberChange} type="number" name="creditCardNumber"></input>
      <input 
        ref={(reference) => cardCodeInputRef.current = reference}  
        onChange={handleCardCodeChange}
        type="number" name="creditCardCode">
      </input>
      {/* short writing of ref */}
      <input ref={cardExpirationInputRef} type="number" name="creditCardExpiration"></input>
  )
}
```

[⬆ back to top](#top)

## using useMemo

```typescript

```

[⬆ back to top](#top)

## using JSON server and API design

- `npm i -g json-server`
- create 'db.json' in root folder
- add `"dev-server": "json-server --watch ./db.json -p 3200 --no-cors"` to package.json
- VS code extension: Thunder Client for VS code(same like postman in VS code)

|Method|URL|body|response|
|---|---|---|---|
|Get|/notes||[{id: 1, title: "xxx", content: "xxx", created_at: "xxx"}]|
|Get|/notes/1||[{id: 1, title: "xxx", content: "xxx", created_at: "xxx"}]|
|POST|/notes|{title: "xxx", content: "xxx", created_at: "xxx"}|[{id: 9, title: "xxx", content: "xxx", created_at: "xxx"}]|
|PATCH|/notes/2|{title: "xxx", content: "xxx"}|[{id: 3, title: "xxx", content: "xxx", created_at: "xxx"}]|
|DELETE|/notes/1||{}|

[⬆ back to top](#top)

## using firebase

- `npm install firebase`
- create file 'config.tsx' in root folder
- [Authenticate with Firebase](https://console.firebase.google.com/u/0/project/notemanager-41008/authentication/providers/password-auth?authuser=0)
- **tip**: console command
  - `localStorage.clear()` console command

[⬆ back to top](#top)

## HOC and Toast

- Toast: `npm i sweetalert2`

```typescript
// hoc/withAuthRequired.tsx
export function withAuthRequired(Component) {
    return function protectedComponent() {
        const navigate = useNavigate();
        const user = useSelector((store => store.authSlice.auth.user));
        useEffect(() => {
            if(!user) {
                navigate("/signin");
            }
        }, [])
        return user && <Component />
    }
}
//each page
export const ProtectedApp = withAuthRequired(App);
//modify main.tsx
```

## redux persistenc

- `npm i redux-persist`

## issues

### [plugin:vite:import-analysis] Failed to resolve import "react/jsx-dev-runtime" when use vite

- https://dev.to/lico/pluginviteimport-analysis-failed-to-resolve-import-reactjsx-dev-runtime-from-srcindextsx-does-the-file-exist-3897
- **solution:** Add an option classic to jsxRuntime of the plugin react in the 'vite config' file.

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';   //new plugin
import svgrPlugin from 'vite-plugin-svgr';             //new plugin
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxRuntime: 'classic' // Add this line
  }), viteTsconfigPaths(), svgrPlugin()],
});
```

[⬆ back to top](#top)

> https://github.com/codiku/react-notes-manager

------------------------------------------------------------------------------------------

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


------------------------------
- div.dot*36
- Live Sass Compiler - Click to Watch Sass from the status bar to turn on the live compilation and then click to Stop Watching Sass from the status bar to turn off 
  - Status bar control
  - Press F1 or `ctrl+shift+P` and enter `Live Sass: Watch Sass` to start watching and `Live Sass: Stop Watching Sass` to stop watching
  - Press F1 or `ctrl+shift+P` and enter `Live Sass: Compile Sass - Without` Watch Mode to compile one time compile the current file
