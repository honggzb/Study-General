[NextJs学习-Zod and React-Hook-Form](#top)

- [Define Form Types](#define-form-types)
- [Form with react-hook-form](#form-with-react-hook-form)
- [Integrate Zod for Schema Validation](#integrate-zod-for-schema-validation)
- [Implement Server-Side Validation](#implement-server-side-validation)

------------------------------------------------

## Define Form Types

```ts
// types.ts
import { FieldError, UseFormRegister } from "react-hook-form";
// the structure of the data in the form
export type FormData = {
    email: string;
    githubUrl: string;
    yearsOfExperience: number;
    password: string;
    confirmPassword: string;
  };
// defines the properties expected by the form field component
export type FormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;   //A function from react-hook-form used to register the input field with the form
    error: FieldError | undefined;        //undefined if there are no errors
    valueAsNumber?: boolean;      // optional: A boolean flag indicating whether the field value should be treated as a number. Defaults to undefined.
};
//a union type that enumerates the valid field names
export type ValidFieldNames =
    | "email"
    | "githubUrl"
    | "yearsOfExperience"
    | "password"
    | "confirmPassword";
```

[⬆ back to top](#top)

## Form with react-hook-form

```ts
// components/FormField.tsx
import { FormFieldProps } from "@/types";
const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <input type={type} placeholder={placeholder}
      {...register(name, { valueAsNumber })} />
    {error && <span className="error-message">{error.message}</span>}
  </>
);
export default FormField;
// components/Form.tsx
"use client";
import { useForm } from "react-hook-form";
import { FormData } from "@/types";
import FormField from "./FormField";
function Form() {
  //useForm hook provides functionality for managing form state and validation
  const { register, handleSubmit, formState: { errors }, setError } = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
      console.log("SUCCESS", data);
  }
  return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid col-auto">
          <h1 className="text-3xl font-bold mb-4"> Zod & React-Hook-Form </h1>
          <FormField
            type="email"
            placeholder="Email"
            name="email"
            register={register}
            error={errors.email} />
          <FormField
            type="text"
            placeholder="GitHub URL"
            name="githubUrl"
            register={register}
            error={errors.githubUrl} />
          <FormField
            type="number"
            placeholder="Years of Experience (1 - 10)"
            name="yearsOfExperience"
            register={register}
            error={errors.yearsOfExperience}
            valueAsNumber  />
          <FormField
            type="password"
            placeholder="Password"
            name="password"
            register={register}
            error={errors.password} />
          <FormField
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            register={register}
            error={errors.confirmPassword} />
          <button type="submit" className="submit-button"> Submit </button>
        </div>
      </form>
  );
}
export default Form;
// app/page.tsx
"use client";
import Form from "./components/Form";
function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <Form />
    </main>
  );
}
export default Home;
```

[⬆ back to top](#top)

## Integrate Zod for Schema Validation

- `z` is an instance of the Zod object.
- `ZodType` is a generic type that represents a Zod schema type for a specific data structure
- `zodResolver` is a resolver function that integrates the Zod schema validation with the form validation process

```ts
// types.ts
 export const UserSchema: ZodType<FormData> = z.object({
    email: z.string().email(),
    githubUrl: z.string().url().includes("github.com", { message: "Invalid GitHub URL" }),
    yearsOfExperience: z.number({
        required_error: "required field",
        invalid_type_error: "Years of Experience is required",
      }).min(1).max(10),
    password: z.string()
      .min(8, { message: "Password is too short" })
      .max(20, { message: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });
// components/Form.tsx
import { FormData, UserSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
function Form() {
   // Apply the zodResolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({ resolver: zodResolver(UserSchema) });
 {/* Existing Code...*/}
}
```

[⬆ back to top](#top)

## Implement Server-Side Validation

```ts
// api/form/route.ts
import { UserSchema } from "@/types";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  // Retrieve the JSON data from the request body
  const body = await request.json();
  // Use Zod to validate the received data against the UserSchema
  const result = UserSchema.safeParse(body);
  // Check if the validation is successful
  if (result.success) {
    return NextResponse.json({ success: true });
  }
  // If validation errors, map them into an object
  const serverErrors = Object.fromEntries(
    result.error?.issues?.map((issue) => [issue.path[0], issue.message]) || []
  );
  // Respond with a JSON object containing the validation errors
  return NextResponse.json({ errors: serverErrors });
}

// app/components/Form.tsx
import { FormData, UserSchema, ValidFieldNames } from "@/types";
import axios from "axios";

function Form() {
{/* Existing Code... */}
  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("/api/form", data); // Make a POST request
      const { errors = {} } = response.data; // Destructure the 'errors' property from the response data
      // Define a mapping between server-side field names and their corresponding client-side names
      const fieldErrorMapping: Record<string, ValidFieldNames> = {
        email: "email",
        githubUrl: "githubUrl",
        yearsOfExperience: "yearsOfExperience",
        password: "password",
        confirmPassword: "confirmPassword",
      };
      // Find the first field with an error in the response data
      const fieldWithError = Object.keys(fieldErrorMapping).find(
        (field) => errors[field]
      );
      // If a field with an error is found, update the form error state using setError
      if (fieldWithError) {
        // Use the ValidFieldNames type to ensure the correct field names
        setError(fieldErrorMapping[fieldWithError], {
          type: "server",
          message: errors[fieldWithError],
        });
      }
    } catch (error) {
      alert("Submitting form failed!");
    }
  };
{/* Existing Code... */}
}
```

[⬆ back to top](#top)

> [How to Validate Forms with Zod and React-Hook-Form](https://www.freecodecamp.org/news/react-form-validation-zod-react-hook-form/)
- youTube
  - [React Hook Form - Complete Tutorial (with Zod)](https://www.youtube.com/watch?v=cc_xmawJ8Kg)
  - [React Hook Form Course for Beginners (inc. Zod + Material UI)](https://www.youtube.com/watch?v=JyeWoqWsQFo)
