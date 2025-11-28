import { registerFormSchema } from "@/utils/zod-schemas";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const result = registerFormSchema.safeParse(body);

  if(!result.success) {
    //console.log(result.error.issues);
    let errors = {}
    result.error.issues.forEach((issue) => {
      errors = { ...errors, [issue.path[0]]: issue.message }
    })
    return NextResponse.json({ errors }, { status: 400 });
  }

  return NextResponse.json({ created: true });
}