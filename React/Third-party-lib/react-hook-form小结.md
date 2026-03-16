[react-hook-form](#top)

- [Register fields](#register-fields)
- [Apply validation](#apply-validation)
- [Integrating an existing form](#integrating-an-existing-form)
- [Integrating with UI libraries](#integrating-with-ui-libraries)
- [Using Hooks API](#using-hooks-api)
- [Handle errors](#handle-errors)
- [Schema Validation](#schema-validation)
- [integrating with services](#integrating-with-services)

## Register fields

- **key** concepts in React Hook Form is to **register** component into the hook
- This will make its value available for both the form **validation** and **submission**

```ts
import { useForm, SubmitHandler } from "react-hook-form"

const { register, handleSubmit } = useForm<IFormInput>()
const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

<input {...register("firstName")} />
<select {...register("gender")}>
  <option value="female">female</option>
  <option value="male">male</option>
  <option value="other">other</option>
</select>
```

[🚀back to top](#top)

## Apply validation

**validation rules supported**

- required
- min
- max
- minLength
- maxLength
- pattern
- validate

```html
<input {...register("firstName", { required: true, maxLength: 20 })} />
<input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
<input type="number" {...register("age", { min: 18, max: 99 })} />
```

[🚀back to top](#top)

## Integrating an existing form

- **register** the component's `ref` and assign relevant props to input

```ts
import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form"
interface IFormValues {
  "First Name": string
  Age: number
}
type InputProps = {
  label: Path<IFormValues>
  register: UseFormRegister<IFormValues>
  required: boolean
}
// The following component is an example of your existing Input Component
const Input = ({ label, register, required }: InputProps) => (
  <>
    <label>{label}</label>
    <input {...register(label, { required })} />
  </>
)
// you can use React.forwardRef to pass the ref too
const Select = React.forwardRef<
  HTMLSelectElement,
  { label: string } & ReturnType<UseFormRegister<IFormValues>>
>(({ onChange, onBlur, name, label }, ref) => (
  <>
    <label>{label}</label>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="20">20</option>
      <option value="30">30</option>
    </select>
  </>
))

const App = () => {
  const { register, handleSubmit } = useForm<IFormValues>()
  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    alert(JSON.stringify(data))
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="First Name" register={register} required />
      <Select label="Age" {...register("Age")} />
      <input type="submit" />
    </form>
  )
}
```

## Integrating with UI libraries

- use the `Controller` component, if the component doesn't expose input's `ref`

```ts
import Select from "react-select"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Input } from "@material-ui/core"
interface IFormInput {
  firstName: string
  lastName: string
  iceCreamType: { label: string; value: string }
}
const App = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      iceCreamType: {},
    },
  })
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => <Input {...field} />}
      />
      <Controller
        name="iceCreamType"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={[
              { value: "chocolate", label: "Chocolate" },
              { value: "strawberry", label: "Strawberry" },
              { value: "vanilla", label: "Vanilla" },
            ]}
          />
        )}
      />
      <input type="submit" />
    </form>
  )
}
```

[🚀back to top](#top)

## Using Hooks API

```ts
import * as React from "react"
import { useForm, useController, UseControllerProps } from "react-hook-form"
type FormValues = {
  FirstName: string
}
function Input(props: UseControllerProps<FormValues>) {
  const { field, fieldState } = useController(props)
  return (
    <div>
      <input {...field} placeholder={props.name} />
      <p>{fieldState.isTouched && "Touched"}</p>
      <p>{fieldState.isDirty && "Dirty"}</p>
      <p>{fieldState.invalid ? "invalid" : "valid"}</p>
    </div>
  )
}
export default function App() {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      FirstName: "",
    },
    mode: "onChange",
  })
  const onSubmit = (data: FormValues) => console.log(data)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input control={control} name="FirstName" rules={{ required: true }} />
      <input type="submit" />
    </form>
  )
}
```

[🚀back to top](#top)

## Handle errors

- React Hook Form provides an errors object

```ts
import { useForm } from "react-hook-form"
export default function App() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const onSubmit = (data) => console.log(data)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("firstName", { required: true })}
        aria-invalid={errors.firstName ? "true" : "false"}
      />
      {errors.firstName?.type === "required" && (
        <p role="alert">First name is required</p>
      )}
      <input
        {...register("mail", { required: "Email Address is required" })}
        aria-invalid={errors.mail ? "true" : "false"}
      />
      {errors.mail && <p role="alert">{errors.mail.message}</p>}
      <input type="submit" />
    </form>
  )
}
```

[🚀back to top](#top)

## Schema Validation

- **using `resolver` pass your schema to `useForm`**
- It will validate your input data against the schema and return with either errors or a valid result
- [@hookform/resolvers](https://www.npmjs.com/package/@hookform/resolvers): use any external validation library such as Yup, Zod, Joi, Vest, Ajv and many others
  - [react-hook-form resolver function](https://react-hook-form.com/docs/useform#resolver)

```ts
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const widgetAuthSchema = z.object({
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
});
type WidgetAuthFormData = z.infer<typeof widgetAuthSchema>;
const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WidgetAuthFormData>({
    resolver: zodResolver(widgetAuthSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });
```

### 💡TIP- debug + useEffect

```ts
// 1. recommended way is to pass destructured methods to the dependencies of an useEffect
const { reset } = useForm()
useEffect(() => {
  reset({ ... })
}, [reset])
// 2.  can debug your schema via the following code snippet:
resolver: async (data, context, options) => {
  // you can debug your validation schema here
  console.log("formData", data)
  console.log(
    "validation result",
    await anyResolver(schema)(data, context, options)
  )
  return anyResolver(schema)(data, context, options)
}
```

[🚀back to top](#top)

## integrating with services

-  use the library's built-in submission handling
-  `<Form />` component will send form data to an API endpoint or other service

```ts
 const { register, control } = useForm()
 <Form
      action="/api/save" // Send post request with the FormData
      // encType={'application/json'} you can also switch to json object
      onSuccess={() => { alert("Your application is updated.") }}
      onError={() => { alert("Submission has failed.") }}
      control={control}
  >
      <input {...register("firstName", { required: true })} />
      <input {...register("lastName", { required: true })} />
      <button>Submit</button>
 </Form>
```

[🚀back to top](#top)
