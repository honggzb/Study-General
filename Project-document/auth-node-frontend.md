
- [Back End](#back-end)
  - [Nodemon for typescript](#nodemon-for-typescript)
  - [express + express-validation](#express--express-validation)
  - [MongDB using mongoose](#mongdb-using-mongoose)
  - [Authentication + Authorization](#authentication--authorization)
  - [reset password](#reset-password)
  - [Google sign in](#google-sign-in)
- [Front End](#front-end)
  - [React](#react)
  - [Angular](#angular)

---------------------------------------------------------------------------


## Back End

```
📂backend/
 ┣ 📂 src/
 ┃   ┣ 📂 controllers/
 ┃   ┃  ┣ 📄 auth.controller.ts
 ┃   ┃  ┗ 📄 forgot.controller.ts
 ┃   ┣ 📂 models/
 ┃   ┃  ┣ 📄 reset.model.ts
 ┃   ┃  ┗ 📄 users.model.ts
 ┃   ┗ 📄 route.ts
 ┣ 📄 .env
 ┗ 📄 index.ts
```

### Nodemon for typescript

1.Nodemon
   1. `npm i -D nodemon ts-node`
   2. `npm i -g nodemon`
   3. create 'nodemon.json'
   4. add `"start": "nodemon index.ts"` to package.json

```ts
//nodemon.json
{
  "watch": ["src/*", "index.ts"],
  "ext": "js,json,ts",
  "ignore": [".git","node_modules","dist/","coverage/"]
}
```

2. Typescript
   1. `npm i -D typescript`
   2. `npx tsc --init`

### express + express-validation

1. Express
   1. `npm i express`
   2. `npm i -D @types/express`
2. express validation: `npm i express-validation`, `npm i -D @types/express-validation`

```ts
const registerValidation = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  password_confirm: Joi.string().required()
});
```

[⬆ back to top](#top)

### MongDB using mongoose

1. `npm i mongoose bcryptjs`
2. `npm i -D @types/mongoose @types/bcryptjs`
3. create '.env'

### Authentication + Authorization

1. `npm i jsonwebtoken cors cookie-parser`
2. `npm i -D @types/jsonwebtoken @types/cors npm @types/cookie-parser`

![jwt](jwt.png)

### reset password

1.  create 'src/controllers/forgot.controller.ts'
2. send email - [mailhog](https://github.com/mailhog/MailHog)
   1. ![mailhog](mailhog.png)
   2. [](https://kinsta.com/blog/mailhog/)
   3. [MailHog releases download](https://github.com/mailhog/MailHog/releases)
   4. [How to Use MailHog to Test Emails Locally (Step-by-Step Guide)](https://kinsta.com/blog/mailhog/)
   5. `http://localhost:8025/`
3. **Note**:  need change port number for different front end
   1. 'backend\index.ts'
   2. 'backend\src\controllers\forgot.controller.ts'
4. nodemailer
   1.  `npm i nodemailer`
   2.  `npm i -D @types/nodemailer`

```ts
// backend\src\controllers\forgot.controller.ts
import { createTransport } from "nodemailer";
const transporter = createTransport({
  host: '0.0.0.0',
  port: 1025
})
export const forgot = async (req: Request, res: Response) => {
   //...
 const url = `http://localhost:3000/reset/${token}`;
  await transporter.sendMail({
    from: 'admin@example.com',
    to: email,
    subject: 'Reset your password',
    html: `Click <a href="${url}"> here </a> to reset your password!`
  });
 //...
}
```

> [A Guide to Password Reset and Password Reset with Express](https://vikasmishra.medium.com/a-guide-to-password-reset-and-password-reset-with-express-64f54e4adfbf)

[⬆ back to top](#top)

### Google sign in

- https://www.youtube.com/watch?v=17xwTuidqZw
- https://github.com/consultingninja/oAuthReactExpress/tree/main

[⬆ back to top](#top)

## Front End

### React

1. `npx create-react-app frontreact --template typescript`
2.  go to 'getbootstrap.com' and choose a Examples  --> 'sign in'
3.  `npm i react-router-dom @types/react-router-dom`
4.  `npm i @reduxjs/toolkit react-redux`
5.  `npm i --save-dev @types/node`

```
📂 frontreact/
 ┣ 📂 src/
 ┃   ┣ 📂 components/
 ┃   ┃  ┗ 📄 Nav.tsx
 ┃   ┣ 📂 interceptors/
 ┃   ┃  ┗ 📄 axios.ts             -- axios interceptor
 ┃   ┣ 📂 pages/
 ┃   ┃  ┣ 📄 Forgot.tsx
 ┃   ┃  ┣ 📄 Home.tsx
 ┃   ┃  ┣ 📄 Login.tsx
 ┃   ┃  ┣ 📄 Register.tsx
 ┃   ┃  ┗ 📄 Reset.tsx
 ┃   ┣ 📂 redux/
 ┃   ┃  ┣ 📄 authSlice.ts
 ┃   ┃  ┗ 📄 store.ts
 ┃   ┣ 📂 types/
 ┃   ┃  ┗ 📄 User.ts
 ┃   ┗ 📄 route.ts
 ┣ 📄 App.tsx
 ┗ 📄 index.tsx
```

[⬆ back to top](#top)

### Angular

1. `ng new frontangular`
2.  go to 'getbootstrap.com' and choose a Examples  --> 'sign in'

[⬆ back to top](#top)

