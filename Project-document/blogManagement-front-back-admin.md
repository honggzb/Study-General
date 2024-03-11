[React + TypeScript + Vite + Node + Swagger](#top)

- [Project structure](#project-structure)
- [using flowbite-react](#using-flowbite-react)
- [Backend Setup](#backend-setup)
  - [error: SyntaxError: Cannot use import statement outside a module](#error-syntaxerror-cannot-use-import-statement-outside-a-module)
- [redux structure](#redux-structure)
- [OAuth using firebase](#oauth-using-firebase)
  - [Add Firebase to project](#add-firebase-to-project)
  - [using google email authentication 1](#using-google-email-authentication-1)
  - [using google email authentication 2](#using-google-email-authentication-2)
- [Theme toggle - using user-defined Provider + tailwindcss](#theme-toggle---using-user-defined-provider--tailwindcss)
- [Display page as requirement- Admin dashboard](#display-page-as-requirement--admin-dashboard)
- [Tab effect using urlParams](#tab-effect-using-urlparams)
- [upload image files to firebase](#upload-image-files-to-firebase)
- [react-quill- rich-text editor](#react-quill--rich-text-editor)
- [ScrollToTop when click a link](#scrolltotop-when-click-a-link)
- [JSON.parse the file manually](#jsonparse-the-file-manually)
- [Types in React](#types-in-react)

----------------------------------------------------------------

## Project structure

- `npm i react-icons react-circular-progressbar react-quill`
- `npm i react-router-dom`
- `npm i @reduxjs/toolkit react-redux redux-persist`
- `npm i --save-dev @types/node`
- `npm i --save-dev tailwind-scrollbar`

```
📂 blogAdmin
 ┣ 📂 api
 ┃   ┣ 📂 Controllers
 ┃   ┃  ┣ 📄 comment.controller.js
 ┃   ┃  ┣ 📄 auth.controller.js
 ┃   ┃  ┣ 📄 post.controller.js
 ┃   ┃  ┗ 📄 user.controller.js
 ┃   ┣ 📂 models
 ┃   ┃  ┣ 📄 comment.model.js
 ┃   ┃  ┣ 📄 post.model.js
 ┃   ┃  ┗ 📄 user.model.js
 ┃   ┣ 📂 routes
 ┃   ┃  ┣ 📄 comment.model.js
 ┃   ┃  ┣ 📄 post.model.js
 ┃   ┃  ┗ 📄 user.model.js
 ┃   ┣ 📂 utils
 ┃   ┃  ┣ 📄 comment.model.js
 ┃   ┃  ┣ 📄 post.model.js
 ┃   ┃  ┗ 📄 user.model.js
 ┃   ┗ 📄 index.js
 ┣ 📂 client
 ┃   ┣ 📂 src
 ┃   ┃  ┣ 📂 components
 ┃   ┃  ┣ 📂 pages
 ┃   ┃  ┣ 📄 app.tsx
 ┃   ┃  ┣ 📄 index.css
 ┃   ┃  ┗ 📄 main.tsx
 ┃   ┣ 📄 tailwind.config.js   
 ┃   ┗ 📄 users.controller.js
 ┣ 📄 .env
 ┗ 📄 package.json
```

## using flowbite-react

1. `npm i flowbite-react`:  [flowbite-react](https://www.flowbite-react.com/docs/getting-started/quickstart)
2. Add the Flowbite plugin to `tailwind.config.js`

```ts
export default {
  content: [
    //...
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  plugins: [require('flowbite/plugin')],
}
```

## Backend Setup

- `npm init -y`
- `npm i express dotenv nodemon cookie-parser bcryptjs jsonwebtoken mongoose`

### error: SyntaxError: Cannot use import statement outside a module

```ts
// package.json
{
  "type": "module"
}
```

## redux structure

```
┣ userSlice
┃  ┣ currentUser: ''
┃  ┣ error: ''
┃  ┗ loading: ''
┣ themeSlice
┃  ┗ theme: 'light'
┣ persist
```

[⬆ back to top](#top)

## OAuth using firebase

### Add Firebase to project

- `npm install firebase`
- create 'e-commerce' project in [firebase console](https://console.firebase.google.com/)
  - [Add Firebase to your JavaScript project](https://firebase.google.com/docs/web/setup)
- create 'src\firebase\firebase.utils.tsx'

```javascript
//firebase.utils.tsx
//Before: version 8
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
// v9 compat packages are API compatible with v8 code
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "xxxxxxxx",
    authDomain: "xxxxxxxx",
    projectId: "xxxxxxxxx",
    storageBucket: "xxxxxxxxx",
    messagingSenderId: "2540590327",
    appId: "1:xxxxxxxx:web:xxxxxxxxxxx",
    measurementId: "G-xxxxxxxxxxxxxxx"
};
firebase.initializeApp(firebaseConfig);
```

[⬆ back to top](#top)

### using google email authentication 1

- enable google email sign-in in firebase console
- ![firebase](./images/firebase.png)
- add codes in 'src\firebase\firebase.utils.tsx' and component.tsx

```javascript
//1. src\firebase\firebase.utils.tsx
export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
//2. src\components\sign-in\Signin.tsx
<CustomButton onClick={signInWithGoogle}> Sign in with Google</CustomButton> 
```

-  **Cross-Origin-Opener-Policy policy** would block the window closed call error while using google auth
-  changed the method from `signInWithPopup` to `signInWithRedirect`. But with this method, need to handle this redirect with "useEffect" hook
- https://stackoverflow.com/questions/76446840/cross-origin-opener-policy-policy-would-block-the-window-closed-call-error-while

[⬆ back to top](#top)

### using google email authentication 2

```ts
//firebase.js
import { initializeApp } from 'firebase/app';
const firebaseConfig = {
    apiKey: "xxxxxxxx",
    authDomain: "xxxxxxxx",
    projectId: "xxxxxxxxx",
    storageBucket: "xxxxxxxxx",
    messagingSenderId: "2540590327",
    appId: "1:xxxxxxxx:web:xxxxxxxxxxx",
    measurementId: "G-xxxxxxxxxxxxxxx"
};
export const app = initializeApp(firebaseConfig);
// OAuth.tsx  -using provider
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';

const auth = getAuth(app);
const handleGoogleClick = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  const resultsFromGoogle = await signInWithPopup(auth, provider);
  //...
}
```

[⬆ back to top](#top)

## Theme toggle - using user-defined Provider + tailwindcss

```ts
//1. define a Provider: ThemeProvider.tsx
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store';
export function ThemeProvider({ children }: { children: React.ReactElement }) {
  const { theme } = useSelector((state: RootState) => state.themeSlice);
  return (
    <div className={theme}>
      <div className='bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,52)] min-h-screen'>
        { children }
      </div>
    </div>
  )
}
export default ThemeProvider;
// main.tsx
<ThemeProvider>
  <App />
</ThemeProvider>
// using in Header.tsx
<Button className="w-12 h-10 sm:inline" color='grey' pill onClick={() => dispatch(toggleTheme())}>
  {theme === 'light' ?  <FaSun /> : <FaMoon />}
</Button>
```

[⬆ back to top](#top)

## Display page as requirement- Admin dashboard

- create `PrivateRoute.tsx` and `OnlyAdminPrivateRoute.tsx`
- add `PrivateRoute` and `OnlyAdminPrivateRoute` in `App.tsx`

```ts
// src/components/PrivateRoute.tsx
function PrivateRoute() {
  const { currentUser } = useSelector((state: RootState) => state.userSlice);
  return currentUser.email !== '' ? <Outlet /> : <Navigate to='/sign-in' />
}
export default PrivateRoute
// src/components/OnlyAdminPrivateRoute.tsx
function OnlyAdminPrivateRoute() {
  const { currentUser } = useSelector((state: RootState) => state.userSlice);
  return (currentUser.email !== '' && currentUser.isAdmin) ? <Outlet /> : <Navigate to='/sign-in' />
}
export default OnlyAdminPrivateRoute
// App.tsx
<Route element={<PrivateRoute />}>
  <Route path='/dashboard' element={<Dashboard />} />
</Route>
<Route element={<OnlyAdminPrivateRoute />}>
  <Route path='/create-note' element={<CreateNote />} />
  <Route path='/update-note/:noteId' element={<UpdateNote />} />
</Route>
```

[⬆ back to top](#top)

## Tab effect using urlParams

- `useLocation.search()`
- `URLSearchParams`
- `useEffect`

```ts
const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    console.log(tabFromUrl)
    if(tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        <DashSidebar />
      </div>
      {/* profile... */}
      { tab === 'profile' && <DashProfile /> }
      {/* posts... */}
      { tab === 'notes' && <DashNotes /> }
      {/* users */}
      { tab === 'users' && <DashUsers /> }
    </div>
  )
}
```

[⬆ back to top](#top)

## upload image files to firebase

- `npm i react-circular-progressbar`

```ts
import { useState } from 'react';
function FileUploadSingle() {
  const [file, setFile] = useState<File>();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) { setFile(e.target.files[0]); }
  };
  const handleUploadClick = () => {
    if (!file) { return; }
    // 👇 Uploading the file using the fetch API to the server
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: file,
      // 👇 Set headers manually for single file upload
      headers: {
        'content-type': file.type,
        'content-length': `${file.size}`, // 👈 Headers need to be a string
      },
    }).then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <div>{file && `${file.name} - ${file.type}`}</div>
      <button onClick={handleUploadClick}>Upload</button>
    </div>
  );
}
export default FileUploadSingle;
```

![Alt text](image.png)

[⬆ back to top](#top)

## react-quill- rich-text editor

- rich-text editor as a React component

[⬆ back to top](#top)

## ScrollToTop when click a link

- create a 'ScrollToTop.tsx'
- add ScrollToTop to 'app.tsx'

```ts
// ScrollToTop.tsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
export default ScrollToTop
// app.tsx
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      //... 
    </BrowserRouter> 
  )
//... 
```

## JSON.parse the file manually

- To load an ES module, adding `"type":"module"` into 'package.json'

```ts
// const fs = require('fs');
import * as fs from 'fs';
const result = JSON.parse(fs.readFileSync('./package.json'));
```

## Types in React

|HTML tag and event|Type|
|---|---|
|`<input type="text/email/password" onChange={ handleChange }/>`|`useState<FormData>()`<br>`handleChange = ((e: React.FormEvent<HTMLInputElement>) => {setFormData({ ...formData, [e.currentTarget.id]: e.currentTarget.value.trim() })`|
|`<form onSubmit={handleSubmit}>`|`useState<FormData>()`<br>`handleSubmit = ((e: React.SyntheticEvent) => {...})`|
|`<input type="file" onChange={ handleImageChange }/>`|`useState<File>()`<br>`handleImageChange = ((e: React.ChangeEvent<HTMLInputElement>) => {...})`|
|||

[⬆ back to top](#top)
