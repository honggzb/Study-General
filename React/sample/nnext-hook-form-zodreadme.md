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
   2. define `SignUpSchema` type
   3. define `SignUpFields` type
2. use it in react-hook-form
