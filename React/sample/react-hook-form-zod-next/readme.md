## setup

1. `npm install react-hook-form`
2. `npm i zod`
   1. zod must enable strict mode in your 'tsconfig.json'
   2. `"compilerOptions": { "strict": true }`
3. `npm i @hookform/resolvers`
   - [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers): allows you to use any external validation library such as Yup, Zod, Joi, Vest, Ajv and many others

## zod validation

1. create 'utils\zod-schemas.ts'
   1. define `registerFormSchema` schema
   2. define <mark>`SignUpSchema`</mark> type --> `useForm` all form
   3. define <mark>`SignUpFields`</mark> type --> each field of form
2. use it in react-hook-form
3. enter in browser
   - `localhost:3000/simple-form`
   - `localhost:3000/react-hook-form-with-zod`

```ts
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm<SignUpSchema>({
    resolver: zodResolver(registerFormSchema)
  });
```

## project structure

```
react-hook-form-zod
├─ 📂app
│  ├─ 📂api/
│  │  └─ 📂register/
│  │     └─ 📄route.ts     # test api
│  ├─ 📂react-hook-form-with-zod/
│  │   └─ 📄page.tsx
│  ├─ 📂simple-form/
│  │   └─ 📄page.tsx
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ 📂public/
└─ 📂utils/
   └─ 📄zod-schemas.ts
```
